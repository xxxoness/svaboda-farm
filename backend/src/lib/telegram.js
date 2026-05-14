import https from 'node:https'

const TELEGRAM_API = 'https://api.telegram.org'

export function telegramEnabled() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_ADMIN_CHAT_ID)
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export async function sendTelegramMessage(text) {
  if (!telegramEnabled()) return

  const payload = JSON.stringify({
    chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  })
  const url = new URL(`${TELEGRAM_API}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`)
  const timeoutMs = Number(process.env.TELEGRAM_TIMEOUT_MS || 5_000)

  await new Promise((resolve, reject) => {
    const request = https.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (response) => {
        let body = ''
        response.setEncoding('utf8')
        response.on('data', (chunk) => {
          body += chunk
        })
        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) return resolve()
          return reject(new Error(`Telegram notification failed: ${response.statusCode} ${body}`))
        })
      },
    )

    request.setTimeout(timeoutMs, () => {
      request.destroy(new Error(`Telegram notification timeout after ${timeoutMs}ms`))
    })
    request.on('error', reject)
    request.write(payload)
    request.end()
  })
}

export async function notifyNewOrder(order) {
  const items = order.items
    .map((item) => `• ${escapeHtml(item.name)} x ${item.qty} ${escapeHtml(item.unit)} = ${(item.price * item.qty).toFixed(2)} BYN`)
    .join('\n')

  await sendTelegramMessage(
    [
      '<b>Новый заказ</b>',
      `Клиент: ${escapeHtml(order.customerName)}`,
      `Телефон: ${escapeHtml(order.customerPhone)}`,
      order.customerEmail ? `Email: ${escapeHtml(order.customerEmail)}` : null,
      `Адрес: ${escapeHtml(order.address)}`,
      order.comment ? `Комментарий: ${escapeHtml(order.comment)}` : null,
      '',
      items,
      '',
      `<b>Итого: ${Number(order.total).toFixed(2)} BYN</b>`,
    ].filter(Boolean).join('\n')
  )
}

export async function notifySupportRequest(request) {
  await sendTelegramMessage(
    [
      '<b>Новый вопрос в поддержку</b>',
      `Клиент: ${escapeHtml(request.name)}`,
      `Телефон: ${escapeHtml(request.phone)}`,
      `Тема: ${escapeHtml(request.topic)}`,
      '',
      escapeHtml(request.message),
    ].join('\n')
  )
}

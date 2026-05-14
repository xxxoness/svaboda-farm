const TELEGRAM_API = 'https://api.telegram.org'

function telegramEnabled() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_ADMIN_CHAT_ID)
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

async function sendTelegramMessage(text) {
  if (!telegramEnabled()) return

  const response = await fetch(`${TELEGRAM_API}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    throw new Error(`Telegram notification failed: ${response.status}`)
  }
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

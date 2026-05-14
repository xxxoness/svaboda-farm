import express from 'express'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { sendTelegramMessage, telegramEnabled } from '../lib/telegram.js'

const router = express.Router()

router.get('/telegram/status', requireAuth, requireRole('ADMIN'), (_req, res) => {
  res.json({
    enabled: telegramEnabled(),
    hasBotToken: Boolean(process.env.TELEGRAM_BOT_TOKEN),
    hasAdminChatId: Boolean(process.env.TELEGRAM_ADMIN_CHAT_ID),
  })
})

router.post('/telegram/test', requireAuth, requireRole('ADMIN'), async (_req, res) => {
  if (!telegramEnabled()) {
    return res.status(400).json({ message: 'Telegram is not configured' })
  }
  try {
    await sendTelegramMessage('Тестовое уведомление Свобода Ферма')
    return res.json({ ok: true })
  } catch (error) {
    return res.status(502).json({
      message: 'Telegram test failed',
      error: error.message,
    })
  }
})

export default router

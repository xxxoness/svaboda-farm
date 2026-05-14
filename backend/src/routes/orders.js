import express from 'express'
import { z } from 'zod'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { createOrder, listOrders, updateOrderStatus } from '../lib/store.js'
import { notifyNewOrder } from '../lib/telegram.js'

const router = express.Router()

const trimString = (schema) => z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : value),
  schema,
)

const optionalText = z.preprocess(
  (value) => {
    if (typeof value !== 'string') return value ?? null
    const trimmed = value.trim()
    return trimmed.length ? trimmed : null
  },
  z.string().nullable().optional(),
)

const optionalEmail = z.preprocess(
  (value) => {
    if (typeof value !== 'string') return value ?? null
    const trimmed = value.trim()
    return trimmed.length ? trimmed : null
  },
  z.string().email().nullable().optional(),
)

const numberFromInput = z.preprocess(
  (value) => (typeof value === 'string' ? Number(value) : value),
  z.number().positive(),
)

const orderSchema = z.object({
  customerName: trimString(z.string().min(1)),
  customerPhone: trimString(z.string().min(3)),
  customerEmail: optionalEmail,
  address: trimString(z.string().min(1)),
  comment: optionalText,
  paymentMethod: z.enum(['PAY_AFTER_CONFIRMATION', 'CASH_ON_DELIVERY', 'BANK_TRANSFER']),
  items: z.array(
    z.object({
      productId: trimString(z.string().min(1)),
      name: trimString(z.string().min(1)),
      qty: numberFromInput,
      unit: trimString(z.string().min(1)),
      price: numberFromInput,
    })
  ).min(1),
})

const statusSchema = z.object({
  status: z.enum(['NEW', 'CONFIRMED', 'FULFILLED', 'CANCELLED']),
  adminNote: z.string().max(500).optional().nullable(),
})

router.post('/', async (req, res) => {
  const parsed = orderSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Проверьте поля заявки: имя, телефон, адрес и состав заказа.',
      fields: parsed.error.flatten().fieldErrors,
    })
  }

  const created = await createOrder(parsed.data)
  notifyNewOrder(created).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error.message)
  })

  return res.status(201).json(created)
})

router.get('/admin', requireAuth, requireRole('ADMIN'), async (_req, res) => {
  const orders = await listOrders()
  res.json(orders)
})

router.patch('/:id/status', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const parsed = statusSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload' })

  const updated = await updateOrderStatus(req.params.id, {
    status: parsed.data.status,
    adminNote: parsed.data.adminNote,
  })
  if (!updated) return res.status(404).json({ message: 'Order not found' })

  res.json(updated)
})

export default router

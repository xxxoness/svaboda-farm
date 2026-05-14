import express from 'express'
import { z } from 'zod'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { createSupportRequest, listSupportRequests, updateSupportRequest } from '../lib/store.js'
import { notifySupportRequest } from '../lib/telegram.js'

const router = express.Router()

const requestSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  topic: z.string().min(2),
  message: z.string().min(3),
})

const updateSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'CLOSED']),
  operatorNote: z.string().max(500).optional().nullable(),
})

router.post('/', async (req, res) => {
  const parsed = requestSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload' })
  const created = await createSupportRequest(parsed.data)
  notifySupportRequest(created).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error.message)
  })
  res.status(201).json(created)
})

router.get('/admin', requireAuth, requireRole('ADMIN'), async (_req, res) => {
  res.json(await listSupportRequests())
})

router.patch('/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const parsed = updateSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload' })
  const updated = await updateSupportRequest(req.params.id, parsed.data)
  if (!updated) return res.status(404).json({ message: 'Request not found' })
  res.json(updated)
})

export default router

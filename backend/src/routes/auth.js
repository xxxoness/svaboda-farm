import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { authRateLimit } from '../middleware/rateLimit.js'

const router = express.Router()

router.post('/login', authRateLimit(), async (req, res) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT secret is not configured' })
  }

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload' })

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH
  const adminName = process.env.ADMIN_NAME || 'Owner'

  const emailOk = parsed.data.email === adminEmail
  const passwordOk = adminPasswordHash
    ? await bcrypt.compare(parsed.data.password, adminPasswordHash)
    : parsed.data.password === adminPassword
  const ok = emailOk && passwordOk
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

  const user = {
    id: 'owner',
    email: adminEmail,
    role: 'ADMIN',
    name: adminName,
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return res.json({
    token,
    user,
  })
})

export default router

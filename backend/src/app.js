import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import notificationRoutes from './routes/notifications.js'
import orderRoutes from './routes/orders.js'
import supportRoutes from './routes/support.js'
import { rateLimit } from './middleware/rateLimit.js'
import { resolveAllowedOrigins, securityHeaders } from './middleware/security.js'

export function createApp() {
  const app = express()
  const allowedOrigins = resolveAllowedOrigins()

  app.set('trust proxy', 1)
  app.use(securityHeaders)
  app.use(cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    },
  }))
  app.use(express.json({ limit: '100kb' }))
  app.use(rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000),
    max: Number(process.env.RATE_LIMIT_MAX || 180),
  }))

  app.get('/api/health', (_req, res) => res.json({ ok: true }))
  app.use('/api/auth', authRoutes)
  app.use('/api/notifications', notificationRoutes)
  app.use('/api/orders', orderRoutes)
  app.use('/api/support', supportRoutes)

  app.use((err, _req, res, _next) => {
    if (err.message === 'Not allowed by CORS') {
      return res.status(403).json({ message: 'Origin is not allowed' })
    }
    // eslint-disable-next-line no-console
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  })

  return app
}

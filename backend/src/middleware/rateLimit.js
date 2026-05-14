const buckets = new Map()

function clientKey(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown'
}

export function rateLimit({ windowMs = 60_000, max = 120 } = {}) {
  return (req, res, next) => {
    const now = Date.now()
    const key = clientKey(req)
    const bucket = buckets.get(key)

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs })
      return next()
    }

    bucket.count += 1
    if (bucket.count > max) {
      return res.status(429).json({ message: 'Too many requests. Try again later.' })
    }

    return next()
  }
}

export function authRateLimit() {
  return rateLimit({
    windowMs: Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    max: Number(process.env.AUTH_RATE_LIMIT_MAX || 12),
  })
}

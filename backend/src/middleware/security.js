export function securityHeaders(_req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  next()
}

export function resolveAllowedOrigins() {
  const raw = process.env.CORS_ORIGINS || process.env.FRONTEND_URL || ''
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

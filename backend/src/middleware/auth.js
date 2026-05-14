import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT secret is not configured' })
  }

  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    next()
  }
}

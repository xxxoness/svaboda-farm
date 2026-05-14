const API_BASES = [
  import.meta.env.VITE_API_URL,
  'http://localhost:4000/api',
  'http://127.0.0.1:4000/api',
].filter(Boolean)

async function jsonRequest(path, options = {}) {
  let lastError

  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}${path}`, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      })
      if (!res.ok) {
        const text = await res.text()
        let message = text || `HTTP ${res.status}`
        try {
          const data = JSON.parse(text)
          message = data.message || message
        } catch {
          // The backend may return plain text in development.
        }
        throw new Error(message)
      }
      return res.json()
    } catch (err) {
      lastError = err
    }
  }

  throw lastError || new Error('API is unavailable')
}

export async function createOrder(payload) {
  return jsonRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function adminLogin(email, password) {
  return jsonRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function getAdminOrders(token) {
  return jsonRequest('/orders/admin', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function updateAdminOrderStatus(token, orderId, payload) {
  return jsonRequest(`/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  })
}

export async function createSupportRequest(payload) {
  return jsonRequest('/support', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getAdminSupportRequests(token) {
  return jsonRequest('/support/admin', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function updateAdminSupportRequest(token, requestId, payload) {
  return jsonRequest(`/support/${requestId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  })
}

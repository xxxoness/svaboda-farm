import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const CartContext = createContext(null)
const CART_KEY = 'svaboda_cart'

function readCart() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readCart())

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product, qty = 1, unit = 'кг') => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.unit === unit)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.unit === unit ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, { ...product, qty, unit }]
    })
  }, [])

  const updateQty = useCallback((id, unit, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => !(i.id === id && i.unit === unit))
      return prev.map((i) => (i.id === id && i.unit === unit ? { ...i, qty } : i))
    })
  }, [])

  const removeItem = useCallback((id, unit) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.unit === unit)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const total = items.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 0), 0)
  const count = items.reduce((sum, i) => sum + (i.qty || 0), 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

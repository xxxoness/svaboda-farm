import { useState } from 'react'
import { X, Plus, Minus, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ProductImage from './ProductImage'

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart()
  const isKg = product.unit === 'кг'
  const [qty, setQty] = useState(isKg ? 1 : 1)
  const step = isKg ? 0.5 : 1
  const min = isKg ? 0.5 : 1
  const max = isKg ? 50 : 20

  const total = (product.price * qty).toFixed(2)

  const handleAdd = () => {
    addItem(product, qty, product.unit)
    onClose()
  }

  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl bg-[#0a0a10] border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <ProductImage product={product} className="h-56">
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70">
            <X className="w-5 h-5" />
          </button>
          {product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500/90 text-white text-sm font-semibold">
              {product.badge}
            </span>
          )}
        </ProductImage>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="text-white/70 text-sm mb-4">{product.description}</p>
          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="text-white/50">Вес: {product.weight}</span>
            <span className="text-amber-400 font-semibold">{product.price} BYN / {product.unit}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-white/60">Количество:</span>
            <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-1">
              <button
                onClick={() => setQty((p) => Math.max(min, p - step))}
                className="p-2 rounded-lg hover:bg-white/10"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Math.max(min, Math.min(max, parseFloat(e.target.value) || min)))}
                step={step}
                min={min}
                max={max}
                className="w-16 bg-transparent text-center text-lg font-semibold focus:outline-none"
              />
              <button
                onClick={() => setQty((p) => Math.min(max, p + step))}
                className="p-2 rounded-lg hover:bg-white/10"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-white/50">{product.unit}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-400">{total} BYN</span>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-lime-600 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

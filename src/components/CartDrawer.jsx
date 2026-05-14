import { Link } from 'react-router-dom'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ProductImage from './ProductImage'

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeItem, total } = useCart()

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-[#0a0a10] border-l border-white/10 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            Корзина
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-white/50 text-center py-12">Корзина пуста</p>
          ) : (
            <div className="space-y-4">
              {items.map((i) => (
                <div key={`${i.id}-${i.unit}`} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                  <ProductImage product={i} showFallbackLabel={false} className="w-16 h-16 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{i.name}</h3>
                    <p className="text-amber-400 text-sm">{i.price} BYN × {i.qty} {i.unit} = {(i.price * i.qty).toFixed(2)} BYN</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQty(i.id, i.unit, Math.max(0.5, i.qty - (i.unit === 'кг' ? 0.5 : 1)))} className="text-white/60 hover:text-white text-sm">−</button>
                      <span className="text-sm">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, i.unit, i.qty + (i.unit === 'кг' ? 0.5 : 1))} className="text-white/60 hover:text-white text-sm">+</button>
                      <button onClick={() => removeItem(i.id, i.unit)} className="ml-2 text-red-400 hover:text-red-300" aria-label="Удалить товар">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-4 border-t border-white/10">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Итого:</span>
              <span className="text-amber-400">{total.toFixed(2)} BYN</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-lime-600 text-center font-semibold hover:scale-[1.02] transition-all"
            >
              Оформить заказ
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

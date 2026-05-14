import { useMemo, useState } from 'react'
import { Check, Clock3, Minus, PackageCheck, Plus, ShieldCheck, ShoppingCart, Snowflake, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ProductImage from './ProductImage'

function productKind(product) {
  if (product.id?.startsWith('s')) return 'set'
  if (product.id?.startsWith('g')) return 'greens'
  if (product.id?.startsWith('f')) return 'fruit'
  return 'vegetable'
}

function productPassport(product) {
  const kind = productKind(product)
  if (kind === 'set') {
    return {
      fresh: 'сборка в день подтверждения',
      storage: '+2...+6°C до отгрузки',
      check: '2 проверки состава',
      tip: 'Подходит для семьи, офиса или подарочного заказа.',
    }
  }
  if (kind === 'greens') {
    return {
      fresh: 'до 3-5 дней',
      storage: '+2...+4°C, сухая зона',
      check: 'проверка зелени и упаковки',
      tip: 'Лучше добавить к овощам, салатам и наборам на неделю.',
    }
  }
  if (kind === 'fruit') {
    return {
      fresh: 'до 5-7 дней',
      storage: '+4...+8°C, отдельная тара',
      check: 'проверка спелости',
      tip: 'Хорошо работает для офиса, семьи и подарочных боксов.',
    }
  }
  return {
    fresh: 'до 7-10 дней',
    storage: '+2...+6°C, темная зона',
    check: 'визуальный контроль партии',
    tip: 'База для домашней кухни, супов, салатов и ресторанной заготовки.',
  }
}

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart()
  const isKg = product.unit === 'кг'
  const isSet = product.id?.startsWith('s')
  const [qty, setQty] = useState(isKg ? 1 : 1)
  const step = isKg ? 0.5 : 1
  const min = isKg ? 0.5 : 1
  const max = isKg ? 50 : 20
  const passport = useMemo(() => productPassport(product), [product])
  const presets = isSet ? [1, 2, 4] : isKg ? [0.5, 1, 3, 5] : [1, 3, 6, 12]
  const total = (product.price * qty).toFixed(2)

  const handleAdd = () => {
    addItem(product, qty, product.unit)
    onClose()
  }

  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="theme-card grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#0a0a10] shadow-2xl lg:grid-cols-[0.95fr_1.05fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <ProductImage product={product} className="min-h-72 lg:min-h-full">
          <button onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 hover:bg-black/70" aria-label="Закрыть">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            {product.badge && (
              <span className="mb-3 inline-flex rounded-full bg-amber-500/90 px-3 py-1 text-sm font-semibold text-white">
                {product.badge}
              </span>
            )}
            <div className="rounded-3xl border border-white/15 bg-black/45 p-4 text-white backdrop-blur">
              <p className="text-sm text-white/70">Паспорт свежести</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <span className="rounded-2xl bg-white/10 px-3 py-2">{passport.fresh}</span>
                <span className="rounded-2xl bg-white/10 px-3 py-2">{passport.storage}</span>
              </div>
            </div>
          </div>
        </ProductImage>

        <div className="overflow-y-auto p-5 sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black leading-tight sm:text-3xl">{product.name}</h2>
              <p className="mt-2 text-sm text-white/55">{product.weight} · подтверждение наличия перед оплатой</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-2xl font-black text-amber-400">{product.price} BYN</p>
              <p className="text-xs text-white/45">за {product.unit}</p>
            </div>
          </div>

          <p className="theme-muted text-sm leading-relaxed text-white/70">{product.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Snowflake, label: 'Хранение', value: passport.storage },
              { icon: ShieldCheck, label: 'Контроль', value: passport.check },
              { icon: Clock3, label: 'Свежесть', value: passport.fresh },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <item.icon className="h-5 w-5 text-amber-300" />
                <p className="mt-3 text-xs text-white/45">{item.label}</p>
                <p className="mt-1 text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-amber-500/25 bg-amber-500/10 p-4">
            <div className="flex gap-3">
              <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <div>
                <p className="font-bold">Рекомендация оператора</p>
                <p className="theme-muted mt-1 text-sm text-white/60">{passport.tip}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white/70">Количество</span>
              <span className="text-xs text-white/45">Можно изменить в корзине</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((value) => (
                <button
                  key={value}
                  onClick={() => setQty(value)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    qty === value ? 'border-amber-400 bg-amber-400 text-[#1c1912]' : 'border-white/10 bg-white/5 text-white/70 hover:border-amber-500/35'
                  }`}
                >
                  {value} {product.unit}
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 p-1">
                <button onClick={() => setQty((value) => Math.max(min, value - step))} className="rounded-xl p-3 hover:bg-white/10" aria-label="Уменьшить">
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={qty}
                  onChange={(event) => setQty(Math.max(min, Math.min(max, parseFloat(event.target.value) || min)))}
                  step={step}
                  min={min}
                  max={max}
                  className="w-20 bg-transparent text-center text-lg font-semibold outline-none"
                />
                <button onClick={() => setQty((value) => Math.min(max, value + step))} className="rounded-xl p-3 hover:bg-white/10" aria-label="Увеличить">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-white/45">{product.unit}</span>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.045] p-4">
            <div className="flex items-start gap-3 text-sm">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime-300" />
              <p className="theme-muted text-white/60">После отправки корзины администратор проверит наличие и свяжется с вами. Оплаты на сайте до подтверждения нет.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-white/45">Итого по позиции</p>
              <p className="text-3xl font-black text-amber-400">{total} BYN</p>
            </div>
            <button
              onClick={handleAdd}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-lime-600 px-6 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/30"
            >
              <ShoppingCart className="h-5 w-5" />
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

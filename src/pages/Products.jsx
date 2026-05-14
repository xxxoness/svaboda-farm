import { useState, useEffect } from 'react'
import { ClipboardCheck, PackageCheck, ShoppingCart, Truck } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import ProductModal from '../components/ProductModal'
import ProductImage from '../components/ProductImage'
import { CATEGORIES, PRODUCTS, TOP_PRODUCT } from '../data/products'

const CAT_MAP = { vegetables: 'Овощи', fruits: 'Фрукты', greens: 'Зелень', sets: 'Сезонные наборы' }

export default function Products() {
  const [activeCat, setActiveCat] = useState('Овощи')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [urlCat, setUrlCat] = useState(null)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const cat = p.get('cat')
    const top = p.get('top')
    if (top === '1') {
      setActiveCat('Сезонные наборы')
      setUrlCat('top')
    } else if (cat && CAT_MAP[cat]) {
      setActiveCat(CAT_MAP[cat])
      setUrlCat(cat)
    }
  }, [])

  const products = PRODUCTS[activeCat] || []

  return (
    <div className="min-h-screen">
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-400 to-lime-400 bg-clip-text text-transparent">
              Каталог продуктов
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Премиальные овощи и фрукты с фермы. Цены в BYN. Заказ без подписки — от 200 BYN.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={80} className="mb-10">
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { icon: ClipboardCheck, title: 'Заявка без оплаты', text: 'Вы отправляете корзину, мы подтверждаем наличие.' },
                { icon: PackageCheck, title: 'Сборка на складе', text: 'Проверяем качество и комплектуем заказ.' },
                { icon: Truck, title: 'Доставка после согласования', text: 'Оплата и доставка только после звонка администратора.' },
              ].map((item) => (
                <div key={item.title} className="theme-card rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                  <item.icon className="w-7 h-7 text-amber-300 mb-3" />
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="theme-muted mt-2 text-sm text-white/55">{item.text}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {activeCat === 'Сезонные наборы' && urlCat === 'top' && (
            <AnimatedSection delay={100} className="mb-12">
              <div className="rounded-3xl overflow-hidden bg-white/[0.06] border border-amber-500/30 p-4 md:p-5 md:grid md:grid-cols-[320px_1fr] md:gap-7 md:items-center shadow-2xl shadow-amber-950/20">
                <ProductImage product={TOP_PRODUCT} className="w-full h-60 md:h-64 rounded-2xl" />
                <div className="pt-5 md:pt-0">
                  <span className="px-3 py-1 rounded-full bg-amber-500/30 text-amber-400 text-sm font-semibold">{TOP_PRODUCT.badge}</span>
                  <h2 className="text-2xl font-bold mt-2">{TOP_PRODUCT.name}</h2>
                  <p className="text-white/70 mt-2">{TOP_PRODUCT.description}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-2xl font-bold text-amber-400">{TOP_PRODUCT.price} BYN</span>
                    <span className="text-white/50 line-through">{TOP_PRODUCT.oldPrice} BYN</span>
                  </div>
                  <button onClick={() => setSelectedProduct(TOP_PRODUCT)} className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-lime-600 font-semibold hover:scale-105 transition-all">
                    В корзину
                  </button>
                </div>
              </div>
            </AnimatedSection>
          )}

          <div className="sticky top-16 z-20 -mx-4 mb-8 border-y border-white/10 bg-[#07070c]/90 px-4 py-3 backdrop-blur-xl sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
            <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCat === c ? 'bg-gradient-to-r from-amber-500 to-lime-600 text-white shadow-lg shadow-amber-900/30' : 'bg-white/5 border border-white/10 hover:border-amber-500/30'
                }`}
              >
                {c}
              </button>
            ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <AnimatedSection key={p.id} delay={0}>
                <div
                  onClick={() => setSelectedProduct(p)}
                  className="group rounded-3xl overflow-hidden bg-white/[0.055] border border-white/10 cursor-pointer hover:-translate-y-1 hover:border-amber-500/35 hover:shadow-2xl hover:shadow-amber-950/25 transition-all duration-300"
                >
                  <ProductImage product={p} className="aspect-[4/3]" imgClassName="group-hover:scale-110 transition-transform duration-700">
                    {p.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-xs font-semibold">{p.badge}</span>
                    )}
                  </ProductImage>
                  <div className="p-4">
                    <h3 className="font-semibold leading-tight">{p.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/50">{p.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold text-amber-400">{p.price} BYN</span>
                      <span className="text-white/50 text-sm">/ {p.unit}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}

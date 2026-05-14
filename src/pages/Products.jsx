import { useMemo, useState, useEffect } from 'react'
import { ClipboardCheck, PackageCheck, Search, ShoppingCart, SlidersHorizontal, Sparkles, Truck } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import ProductModal from '../components/ProductModal'
import ProductImage from '../components/ProductImage'
import { useCart } from '../context/CartContext'
import { CATEGORIES, PRODUCTS, TOP_PRODUCT } from '../data/products'

const CAT_MAP = { vegetables: 'Овощи', fruits: 'Фрукты', greens: 'Зелень', sets: 'Сезонные наборы' }

const FILTERS = [
  { id: 'all', label: 'Все позиции' },
  { id: 'hit', label: 'Хиты и топ' },
  { id: 'family', label: 'Для семьи' },
  { id: 'b2b', label: 'Для HoReCa' },
]

const SORTS = [
  { id: 'default', label: 'По витрине' },
  { id: 'price-asc', label: 'Цена ниже' },
  { id: 'price-desc', label: 'Цена выше' },
  { id: 'name', label: 'По названию' },
]

function productTags(product) {
  const text = `${product.name} ${product.description} ${product.badge || ''}`.toLowerCase()
  return {
    hit: /хит|топ|премиум/.test(text),
    family: /семь|недел|дет|дом|набор|яблок|картоф|морков/.test(text),
    b2b: /b2b|horeca|ресторан|шеф|кафе|офис|бизнес/.test(text),
  }
}

function availabilityLabel(product) {
  if (product.id?.startsWith('s')) return 'Сборка под заказ'
  if (product.badge) return product.badge
  return 'Доступно к подтверждению'
}

export default function Products() {
  const { addItem } = useCart()
  const [activeCat, setActiveCat] = useState('Овощи')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [urlCat, setUrlCat] = useState(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('default')

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

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = products.filter((product) => {
      const tags = productTags(product)
      const matchesFilter = filter === 'all' || tags[filter]
      const searchable = `${product.name} ${product.description} ${product.badge || ''}`.toLowerCase()
      return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery))
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'name') return a.name.localeCompare(b.name, 'ru')
      return 0
    })
  }, [filter, products, query, sort])

  const totalPositions = products.length
  const minPrice = products.length ? Math.min(...products.map((p) => p.price)) : 0

  const addQuick = (product, event) => {
    event.stopPropagation()
    addItem(product, product.unit === 'кг' ? 1 : 1, product.unit)
  }

  return (
    <div className="min-h-screen">
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
                <Sparkles className="h-4 w-4" />
                Каталог с подтверждением наличия
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
                Выберите продукты, а мы соберем заказ как сервис
              </h1>
              <p className="theme-muted mt-5 max-w-2xl text-white/60">
                Цены в BYN, заявка без оплаты на сайте. Администратор проверит наличие, предложит замену при необходимости и согласует доставку.
              </p>
            </div>
            <div className="theme-card rounded-3xl border border-white/10 bg-white/[0.055] p-5">
              <p className="text-sm text-white/50">В этой категории</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-2xl font-black text-amber-300">{totalPositions}</p>
                  <p className="text-xs text-white/50">позиций</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-2xl font-black text-lime-300">от {minPrice}</p>
                  <p className="text-xs text-white/50">BYN</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={80} className="mb-10">
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { icon: ClipboardCheck, title: 'Заявка без риска', text: 'Корзина уходит админу, деньги не списываются до подтверждения.' },
                { icon: PackageCheck, title: 'Сборка под задачу', text: 'Для дома, офиса, ресторана или подарочного набора.' },
                { icon: Truck, title: 'Доставка после звонка', text: 'Оператор уточнит время, состав и способ оплаты.' },
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
              <div className="theme-card overflow-hidden rounded-3xl border border-amber-500/30 bg-white/[0.06] p-4 shadow-2xl shadow-amber-950/20 md:grid md:grid-cols-[320px_1fr] md:items-center md:gap-7 md:p-5">
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
                    Открыть набор
                  </button>
                </div>
              </div>
            </AnimatedSection>
          )}

          <div className="sticky top-16 z-20 -mx-4 mb-8 border-y border-white/10 bg-[#07070c]/92 px-4 py-3 backdrop-blur-xl sm:static sm:mx-0 sm:rounded-[1.75rem] sm:border sm:bg-white/[0.035] sm:p-3">
            <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setActiveCat(c)
                    setFilter('all')
                  }}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCat === c ? 'bg-gradient-to-r from-amber-500 to-lime-600 text-white shadow-lg shadow-amber-900/30' : 'bg-white/5 border border-white/10 hover:border-amber-500/30'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="grid gap-3 pt-2 md:grid-cols-[1fr_auto_auto]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-300" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Найти продукт, набор или задачу"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 outline-none focus:border-amber-500/40"
                />
              </label>
              <label className="relative block">
                <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-300" />
                <select value={filter} onChange={(event) => setFilter(event.target.value)} className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-10 outline-none focus:border-amber-500/40 md:w-48">
                  {FILTERS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </label>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-amber-500/40 md:w-44">
                {SORTS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="theme-card rounded-3xl border border-white/10 bg-white/[0.055] p-8 text-center">
              <h2 className="text-2xl font-black">Ничего не нашли</h2>
              <p className="theme-muted mt-2 text-white/60">Попробуйте другую категорию или напишите оператору, мы соберем набор вручную.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleProducts.map((p) => (
                <AnimatedSection key={p.id} delay={0}>
                  <article
                    onClick={() => setSelectedProduct(p)}
                    className="group theme-card overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/35 hover:shadow-2xl hover:shadow-amber-950/25"
                  >
                    <ProductImage product={p} className="aspect-[4/3]" imgClassName="group-hover:scale-110 transition-transform duration-700">
                      <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/15 bg-black/40 px-2 py-1 text-xs text-white/85 backdrop-blur">{availabilityLabel(p)}</span>
                      </div>
                    </ProductImage>
                    <div className="p-4">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <h3 className="font-semibold leading-tight">{p.name}</h3>
                        <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-1 text-xs text-amber-300">{p.weight}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-white/50">{p.description}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-lg font-bold text-amber-400">{p.price} BYN</p>
                          <p className="text-xs text-white/45">за {p.unit}</p>
                        </div>
                        <button onClick={(event) => addQuick(p, event)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-lime-600 text-white shadow-lg shadow-amber-950/20 transition hover:scale-105" aria-label="Добавить в корзину">
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}

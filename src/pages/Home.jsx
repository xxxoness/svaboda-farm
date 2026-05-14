import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Truck, Star, Check, ChevronDown, ShoppingBag, Sparkles, Shield, Zap, Heart, Package } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import ProductImage from '../components/ProductImage'
import { BRAND, PLANS } from '../data/constants'
import { TOP_PRODUCT } from '../data/products'
import { createSupportRequest } from '../services/api'

const assetUrl = (src) => {
  if (!src || src.startsWith('http') || src.startsWith('data:')) return src
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${src.replace(/^\//, '')}`
}

const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {
        setDone(true)
        const start = Date.now()
        const run = () => {
          const t = Math.min((Date.now() - start) / duration, 1)
          setCount(Math.floor((1 - Math.pow(1 - t, 3)) * end))
          if (t < 1) requestAnimationFrame(run)
        }
        run()
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration, done])
  return <span ref={ref}>{count}{suffix}</span>
}

const features = [
  { icon: Truck, title: 'Доставка за 24 часа', desc: 'По Минску и области. Холодовая цепь, бережная упаковка.' },
  { icon: Leaf, title: '100% органические', desc: 'Собственные поля. Без пестицидов. Сертификация РБ и ЕС.' },
  { icon: Shield, title: 'Гарантия свежести', desc: 'Не устроило — вернём деньги. Без вопросов.' },
  { icon: Zap, title: 'Заказ без подписки', desc: 'От 200 BYN. Или подписка от 480 BYN/мес со скидками.' },
  { icon: Heart, title: 'Ферма в д. Свабода', desc: 'Могилёвская обл., Круглянский р-н. Свой склад и логистика.' },
  { icon: Package, title: 'Эко-упаковка', desc: 'Перерабатываемые материалы. Забота о природе.' },
]

const trustPillars = [
  { icon: Truck, title: 'Логистика без сюрпризов', desc: 'Время доставки согласуется после подтверждения, а не прячется в мелком шрифте.' },
  { icon: Shield, title: 'Свежесть как стандарт', desc: 'Товар проходит складскую проверку и собирается под конкретную заявку.' },
  { icon: Package, title: 'Сборка уровня подарка', desc: 'Наборы выглядят аккуратно: упаковка, маркировка, чистый состав, понятная цена.' },
]

const stats = [
  { value: 25, suffix: 'K+', label: 'Заказов' },
  { value: 120, suffix: '+', label: 'Ферм' },
  { value: 98, suffix: '%', label: 'Вовремя' },
  { value: 24, suffix: 'ч', label: 'Доставка' },
]

const steps = [
  { icon: ShoppingBag, title: 'Выберите продукты', desc: 'Каталог с ценами и фото. Добавьте в корзину.' },
  { icon: Truck, title: 'Оформите заказ', desc: 'Без подписки от 200 BYN. Или подписка со скидками.' },
  { icon: Sparkles, title: 'Получите', desc: 'Доставка за 24–48 часов. Свежесть гарантирована.' },
]

const testimonials = [
  { name: 'Анна П.', role: 'Шеф-повар', text: 'Качество стабильно высокое. Для ресторана — находка.', rating: 5, initials: 'АП', color: 'from-amber-500 to-lime-600' },
  { name: 'Михаил К.', role: 'Предприниматель', text: 'Подписка сэкономила время. Всё свежее и вовремя.', rating: 5, initials: 'МК', color: 'from-lime-500 to-amber-600' },
  { name: 'Елена С.', role: 'Мама троих', text: 'Дети едят овощи с удовольствием. Рекомендую!', rating: 5, initials: 'ЕС', color: 'from-amber-600 to-lime-500' },
  { name: 'Игорь Л.', role: 'Владелец кафе', text: 'Привозят аккуратно, без хаоса в позициях. Можно планировать меню.', rating: 5, initials: 'ИЛ', color: 'from-emerald-500 to-amber-500' },
  { name: 'Виктория М.', role: 'HR-директор', text: 'Берем фрукты в офис. Люди реально замечают качество и упаковку.', rating: 5, initials: 'ВМ', color: 'from-sky-500 to-lime-500' },
  { name: 'Дмитрий Р.', role: 'Повар', text: 'Зелень приезжает живой, без мокрых пакетов и сюрпризов.', rating: 5, initials: 'ДР', color: 'from-lime-600 to-emerald-500' },
  { name: 'Ольга Н.', role: 'Семейные заказы', text: 'Собрали набор под детей и супы. Очень удобно, что звонят до оплаты.', rating: 5, initials: 'ОН', color: 'from-rose-500 to-amber-500' },
  { name: 'Сергей А.', role: 'Ресторан', text: 'Понравилось, что можно согласовать замену заранее, а не после доставки.', rating: 5, initials: 'СА', color: 'from-violet-500 to-amber-500' },
  { name: 'Марина Б.', role: 'Домашняя кухня', text: 'Овощи выглядят как с хорошего рынка, только без очередей.', rating: 5, initials: 'МБ', color: 'from-amber-500 to-orange-500' },
  { name: 'Павел Т.', role: 'Офис-менеджер', text: 'Регулярная поставка фруктов закрыла маленькую, но вечную боль офиса.', rating: 5, initials: 'ПТ', color: 'from-blue-500 to-lime-500' },
  { name: 'Наталья К.', role: 'Кондитер', text: 'Ягоды и фрукты приходят в хорошем виде, не нужно списывать половину.', rating: 5, initials: 'НК', color: 'from-pink-500 to-amber-500' },
  { name: 'Андрей Ф.', role: 'Гриль-бар', text: 'Гриль-набор зашел отлично: перец, кабачки и баклажаны ровные.', rating: 5, initials: 'АФ', color: 'from-orange-600 to-lime-600' },
  { name: 'Татьяна Г.', role: 'Мама двоих', text: 'Нравится, что можно оставить комментарий и тебя слышат.', rating: 5, initials: 'ТГ', color: 'from-lime-500 to-teal-500' },
  { name: 'Руслан В.', role: 'HoReCa', text: 'Для тестового периода сервис выглядит зрелее многих поставщиков.', rating: 5, initials: 'РВ', color: 'from-stone-500 to-amber-500' },
  { name: 'Кирилл З.', role: 'Предприниматель', text: 'Заказал набор в подарок родителям. Упаковка и состав выглядели достойно.', rating: 5, initials: 'КЗ', color: 'from-amber-600 to-emerald-600' },
  { name: 'Дарья Е.', role: 'ЗОЖ-рацион', text: 'Подписка удобная: меньше решений каждую неделю, больше свежих продуктов дома.', rating: 5, initials: 'ДЕ', color: 'from-emerald-500 to-lime-500' },
  { name: 'Влад С.', role: 'Шеф', text: 'Самое ценное — подтверждение наличия до оплаты. Это профессионально.', rating: 5, initials: 'ВС', color: 'from-red-500 to-amber-500' },
  { name: 'Юлия А.', role: 'Семья', text: 'После обычных доставок приятно видеть нормальную сборку и понятный контакт.', rating: 5, initials: 'ЮА', color: 'from-cyan-500 to-lime-500' },
  { name: 'Роман И.', role: 'Кофейня', text: 'Фрукты для витрины приезжают аккуратные, без ощущения случайного закупа.', rating: 5, initials: 'РИ', color: 'from-purple-500 to-amber-500' },
]

const faqs = [
  { q: 'Что происходит после отправки заявки?', a: 'Заявка попадает в админку владельца. Администратор проверяет наличие, смотрит состав корзины, связывается с вами и только после этого согласует оплату и доставку. Это защищает клиента от ситуации, когда он оплатил товар, которого нет на складе.' },
  { q: 'Как работает подписка?', a: 'Вы выбираете тариф, оставляете заявку, а оператор уточняет частоту поставок, состав набора, адрес и удобный день доставки. На MVP подписка оформляется через подтверждение оператором, без автоматического списания.' },
  { q: 'Можно заказать без подписки?', a: 'Да. Разовый заказ доступен от 200 BYN. Подписка нужна тем, кто хочет регулярные поставки, приоритетную сборку, скидки на наборы и меньше ручных согласований.' },
  { q: 'Почему нет оплаты сразу на сайте?', a: 'Для премиального фермерского продукта важнее не быстрый платеж, а точное подтверждение состава. Мы сначала проверяем свежесть и наличие, затем отправляем клиенту способ оплаты или согласуем оплату при получении.' },
  { q: 'Что с качеством и возвратом?', a: 'Если товар не соответствует согласованному качеству, администратор фиксирует обращение и предлагает замену, возврат или компенсацию. Для этого сохраняются заказ, контакт и комментарии оператора.' },
]

const editorial = [
  { title: 'Урожай под задачу', text: 'Для дома, офиса, ресторана или события. Наборы можно собрать по сезону, бюджету и вкусу.', image: '/assets/farm-catalog.png' },
  { title: 'Сначала подтверждение', text: 'Администратор проверяет наличие, согласует доставку и только потом отправляет способ оплаты.', image: '/assets/farm-storage.png' },
  { title: 'Премиальная комплектация', text: 'Чистая упаковка, аккуратные позиции, понятный состав и контроль перед отгрузкой.', image: '/assets/farm-hero.png' },
]

const heroVisual = { name: 'Свежий фермерский заказ', img: '/assets/farm-hero.png', fallback: 'from-amber-900 via-lime-900 to-emerald-950' }

export default function Home() {
  const [billing, setBilling] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [email, setEmail] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState('')

  const submitSubscription = async (e) => {
    e.preventDefault()
    const value = email.trim()
    if (!value) {
      setSubscriptionStatus('Введите email, и мы закрепим скидку за вашей заявкой.')
      return
    }
    setSubscriptionStatus('Отправляем заявку...')
    try {
      await createSupportRequest({
        name: 'Подписчик рассылки',
        phone: value,
        topic: 'Скидка 15% на первый заказ',
        message: `Клиент оставил email для скидки 15%: ${value}`,
      })
      setSubscriptionStatus('Готово. Скидка 15% закреплена, оператор увидит заявку и свяжется с вами.')
    } catch {
      setSubscriptionStatus('Не удалось отправить заявку. Попробуйте еще раз или напишите в поддержку.')
    }
  }

  return (
    <>
      <section className="on-photo relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        <ProductImage product={heroVisual} showFallbackLabel={false} className="absolute inset-0" imgClassName="scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#07070c_0%,rgba(7,7,12,.88)_38%,rgba(7,7,12,.35)_100%)]" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-amber-200 text-sm mb-6 backdrop-blur">
            <Sparkles className="w-4 h-4" /> {BRAND.tagline}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.02]">
            <span className="text-white">Свобода Ферма</span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-lime-300 to-emerald-300 bg-clip-text text-transparent">премиальный урожай к вашей двери</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl">
            Собственная ферма, бережное хранение, понятный заказ и подтверждение администратором перед оплатой. Соберём свежие овощи, фрукты и наборы для дома, офиса или ресторана.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="inline-flex justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-lime-600 font-semibold text-lg hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30 transition-all">
              Каталог
            </Link>
            <Link to="/warehouse" className="inline-flex justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all backdrop-blur">
              Как храним
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
            {stats.slice(0, 3).map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <p className="text-2xl font-bold text-amber-300">{s.value}{s.suffix}</p>
                <p className="text-xs text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold">Топ продукт</span>
            <h2 className="text-3xl font-bold mt-4">{TOP_PRODUCT.name}</h2>
            <p className="mt-2 text-white/60 max-w-xl mx-auto">{TOP_PRODUCT.description}</p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="rounded-3xl overflow-hidden bg-white/[0.06] border border-amber-500/25 p-5 md:grid md:grid-cols-[24rem_1fr] md:gap-8 md:items-center shadow-2xl shadow-amber-950/20">
              <ProductImage product={TOP_PRODUCT} className="w-full h-64 md:h-72 rounded-2xl" />
              <div>
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-3xl font-bold text-amber-400">{TOP_PRODUCT.price} BYN</span>
                  <span className="text-white/50 line-through">{TOP_PRODUCT.oldPrice} BYN</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {TOP_PRODUCT.features?.map((f, i) => (
                    <li key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" />{f}</li>
                  ))}
                </ul>
                <Link to="/products?top=1" className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-lime-600 font-semibold hover:scale-105 transition-all">
                  Заказать
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white/[0.025]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 max-w-3xl">
            <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">Не витрина, а сервис</span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-black">Фермерский магазин с ощущением премиального консьержа</h2>
            <p className="mt-4 theme-muted text-white/60">Мы строим заказ вокруг свежести и доверия: клиент выбирает, администратор подтверждает, склад собирает, доставка привозит.</p>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-5">
            {editorial.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 80}>
                <div className="theme-card h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055]">
                  <div className="relative h-56 overflow-hidden">
                    <img src={assetUrl(item.image)} alt={item.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 theme-muted text-sm leading-relaxed text-white/58">{item.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 max-w-3xl">
            <span className="rounded-full border border-lime-500/25 bg-lime-500/10 px-3 py-1 text-sm text-lime-300">Сервисная разница</span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-black">Мы убираем из покупки фермерских продуктов три главных риска</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustPillars.map((f, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/20 transition-colors">
                  <f.icon className="w-10 h-10 text-amber-400 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-white/60">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-lime-400 bg-clip-text text-transparent">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-white/60 text-sm">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold">Заказ без нервов</h2>
            <p className="mt-3 theme-muted text-white/55">Мы не заставляем платить в пустоту: заявка сначала проходит живое подтверждение.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-lime-600 flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-white/60 text-sm">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold">Клиенты возвращаются не за скидкой, а за спокойствием</h2>
          </AnimatedSection>
          <div className="relative">
            <div className="premium-marquee flex w-max gap-6">
            {[...testimonials, ...testimonials].map((t, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="theme-card w-80 p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />)}</div>
                  <p className="text-white/80 italic mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-sm`}>{t.initials}</div>
                  <p className="font-medium mt-2">{t.name}</p>
                  <p className="text-white/50 text-sm">{t.role}</p>
                </div>
              </AnimatedSection>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold">Подписка (опционально)</h2>
            <p className="mt-2 text-white/60">Заказ без подписки от 200 BYN. Подписка — скидки и бесплатная доставка.</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className={!billing ? 'text-white' : 'text-white/50'}>Месяц</span>
              <button onClick={() => setBilling(!billing)} className={`w-14 h-8 rounded-full ${billing ? 'bg-amber-500' : 'bg-white/20'}`}>
                <span className={`block w-6 h-6 rounded-full bg-white transition-transform ${billing ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className={billing ? 'text-white' : 'text-white/50'}>Год -10%</span>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((p, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className={`p-6 rounded-2xl border ${p.popular ? 'bg-white/10 border-amber-500/50' : 'bg-white/5 border-white/10'}`}>
                  {p.popular && <span className="block text-center mb-2 text-sm font-semibold text-amber-400">Популярный</span>}
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{p.desc}</p>
                  <div className="mb-4">
                    {p.priceLabel ? <span className="text-xl font-bold text-amber-400">{p.priceLabel}</span> : <><span className="text-2xl font-bold">{billing ? p.priceYear : p.price}</span> BYN/мес</>}
                  </div>
                  <ul className="space-y-2 mb-6 text-sm">
                    {p.features.map((f, j) => <li key={j} className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 flex-shrink-0" />{f}</li>)}
                  </ul>
                  <button onClick={() => setSelectedPlan(p)} className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-lime-600 text-center font-semibold text-sm hover:scale-[1.02] transition-all">
                    Выбрать
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
          {selectedPlan && (
            <AnimatedSection className="mt-8">
              <div className="rounded-3xl border border-amber-500/25 bg-amber-500/10 p-6">
                <h3 className="text-2xl font-black">Вы выбрали тариф “{selectedPlan.name}”</h3>
                <p className="theme-muted mt-2 text-white/60">Оставьте email ниже или перейдите в поддержку: оператор уточнит состав набора, частоту поставок и условия оплаты после подтверждения.</p>
                <Link to="/support" className="mt-4 inline-flex rounded-2xl border border-amber-500/30 bg-amber-500/15 px-5 py-3 text-sm font-semibold text-amber-200">
                  Обсудить подписку с оператором
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <section id="faq" className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold">FAQ</h2>
          </AnimatedSection>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 50}>
                <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <button className="w-full px-4 py-3 flex items-center justify-between text-left">
                    <span className="font-medium">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="overflow-hidden transition-all" style={{ maxHeight: openFaq === i ? '260px' : '0' }}>
                    <p className="px-4 pb-3 text-white/60 text-sm">{faq.a}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-amber-500 to-lime-500 p-10 text-center">
              <h2 className="text-2xl font-bold text-white">Скидка 15% на первый заказ</h2>
              <p className="mt-2 text-white/90">Подпишитесь на рассылку</p>
              <form onSubmit={submitSubscription} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.by" className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder:text-white/70 focus:outline-none" />
                <button type="submit" className="px-6 py-3 rounded-xl bg-white text-amber-600 font-semibold hover:scale-105 transition-all">Подписаться</button>
              </form>
              {subscriptionStatus && (
                <p className="mt-4 rounded-2xl bg-white/20 px-4 py-3 text-sm text-white">
                  {subscriptionStatus}
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

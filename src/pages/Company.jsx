import { Award, CheckCircle2, Leaf, MapPin, ShieldCheck, Truck, Users } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import ProductImage from '../components/ProductImage'
import { BRAND, WAREHOUSE } from '../data/constants'

const companyVisual = { name: 'Ферма SVABODA FARM', img: '/assets/brand/farm-village.jpg', fallback: 'from-amber-900 via-lime-900 to-emerald-950' }

const values = [
  { icon: Leaf, title: 'Сезонность без обмана', text: 'Мы не обещаем вечный идеальный ассортимент. Показываем то, что реально можем подтвердить и собрать.' },
  { icon: ShieldCheck, title: 'Человеческое подтверждение', text: 'Перед оплатой администратор проверяет наличие, состав и условия доставки. Клиент не платит в пустоту.' },
  { icon: Award, title: 'Подача уровня подарка', text: 'Наборы выглядят аккуратно: упаковка, маркировка, чистая комплектация и понятный состав.' },
]

const timeline = [
  ['2019', 'Старт фермерского хозяйства и первых локальных поставок.'],
  ['2022', 'Собственная логистика и работа с семейными заказами.'],
  ['2025', 'Переход к премиальному сервису наборов и B2B-комплектации.'],
  ['2026', 'MVP онлайн-магазина с админским подтверждением заказов.'],
]

const brandShots = [
  { title: 'Ферма и поля', img: '/assets/brand/farm-village.jpg', desc: 'Своя сельская база, теплицы и сезонный урожай рядом с точкой хранения.' },
  { title: 'Брендированная подача', img: '/assets/brand/branded-box.jpg', desc: 'Коробки и ящики выглядят как продукт, который не стыдно вручить клиенту или партнёру.' },
  { title: 'Готовый заказ', img: '/assets/brand/ready-order.jpg', desc: 'Сборка не заканчивается корзиной: финальный вид заказа тоже часть сервиса.' },
]

export default function Company() {
  return (
    <div className="min-h-screen">
      <section className="on-photo relative overflow-hidden py-20 sm:py-28">
        <ProductImage product={companyVisual} showFallbackLabel={false} className="absolute inset-0" imgClassName="scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#07070c_0%,rgba(7,7,12,.9)_45%,rgba(7,7,12,.42)_100%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-sm text-amber-200">
              <Users className="w-4 h-4" />
              О компании
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl font-black leading-tight">{BRAND.name}: ферма, склад и сервис в одной системе</h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl">{BRAND.description}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-6">
            <AnimatedSection>
              <div className="theme-card h-full rounded-3xl border border-white/10 bg-white/[0.055] p-7">
                <MapPin className="w-10 h-10 text-amber-300 mb-5" />
                <h2 className="text-2xl font-black">Мы находимся здесь</h2>
                <p className="mt-4 text-amber-300">{WAREHOUSE.addressFull}</p>
                <p className="theme-muted mt-4 text-white/60">Это не абстрактный интернет-магазин. У проекта есть место хранения, логистика, операторская проверка и понятный процесс подтверждения.</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {['Своя комплектация', 'Контроль свежести', 'Заявка до оплаты', 'Доставка 24–48 ч'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/15 p-4 text-sm">{item}</div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="grid sm:grid-cols-3 gap-4">
                {values.map((value) => (
                  <div key={value.title} className="theme-card rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                    <value.icon className="w-8 h-8 text-amber-300 mb-4" />
                    <h3 className="font-bold">{value.title}</h3>
                    <p className="theme-muted mt-2 text-sm leading-relaxed text-white/55">{value.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/[0.025]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10 max-w-3xl">
            <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">Новый визуальный язык</span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-black">SVABODA FARM выглядит как сервис, а не как случайная доставка</h2>
            <p className="theme-muted mt-3 text-white/55">Ребрендинг переносит акцент с “купить овощи” на доверие, упаковку, контроль и спокойную премиальную подачу.</p>
          </AnimatedSection>
          <div className="grid gap-5 lg:grid-cols-3">
            {brandShots.map((shot, index) => (
              <AnimatedSection key={shot.title} delay={index * 80}>
                <div className="theme-card h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055]">
                  <ProductImage product={shot} showFallbackLabel={false} className="h-72" imgClassName="transition duration-700 hover:scale-105" />
                  <div className="p-5">
                    <h3 className="text-xl font-bold">{shot.title}</h3>
                    <p className="theme-muted mt-2 text-sm leading-relaxed text-white/55">{shot.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-black">Как рос проект</h2>
            <p className="theme-muted mt-3 text-white/55">История нужна не ради пафоса, а ради доверия: клиент понимает, кто собирает его заказ.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-4">
            {timeline.map(([year, text]) => (
              <AnimatedSection key={year}>
                <div className="theme-card rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                  <p className="text-3xl font-black text-amber-300">{year}</p>
                  <p className="theme-muted mt-3 text-sm text-white/58">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Truck className="w-12 h-12 text-amber-300 mx-auto mb-5" />
          <h2 className="text-3xl font-black">Мы продаем не картошку в карточке. Мы продаем спокойствие.</h2>
          <p className="theme-muted mt-4 text-white/60">Премиальный фермерский магазин должен закрывать тревогу клиента: “приедет ли свежее?”, “есть ли в наличии?”, “когда платить?”. Поэтому в основе MVP — подтверждение админом и качественная сборка заказа.</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-lime-500/25 bg-lime-500/10 px-5 py-3 text-lime-200">
            <CheckCircle2 className="w-5 h-5" />
            Заказ подтверждается до оплаты
          </div>
        </div>
      </section>
    </div>
  )
}

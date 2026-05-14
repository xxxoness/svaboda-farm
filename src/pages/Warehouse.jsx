import { ArrowRight, ClipboardCheck, MapPin, PackageCheck, ShieldCheck, Snowflake, Thermometer, Truck } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import ProductImage from '../components/ProductImage'
import { WAREHOUSE, BRAND } from '../data/constants'

const storageVisual = { name: 'Хранение и комплектация', img: '/assets/farm-storage.png', fallback: 'from-stone-900 via-emerald-900 to-amber-900' }

const stages = [
  { icon: ClipboardCheck, title: 'Приёмка', temp: '15 мин', desc: 'Партия проходит визуальный контроль, взвешивание и отбраковку до попадания на склад.' },
  { icon: Snowflake, title: 'Охлаждение', temp: '+2…+6°C', desc: 'Холодовая зона стабилизирует температуру овощей, фруктов и зелени.' },
  { icon: PackageCheck, title: 'Комплектация', temp: 'по заказу', desc: 'Сборка по заявке клиента, маркировка, эко-упаковка и финальная проверка.' },
  { icon: Truck, title: 'Доставка', temp: '24–48 ч', desc: 'Отгрузка в термоконтейнеры или рефрижератор, чтобы свежесть доехала до двери.' },
]

const metrics = [
  ['+2…+6°C', 'температурный режим'],
  ['92%', 'целевая влажность'],
  ['2 проверки', 'до отгрузки'],
  ['24–48 ч', 'доставка после подтверждения'],
]

const audit = [
  ['01', 'Скан заявки', 'Склад видит состав заказа и отмечает спорные позиции до звонка клиенту.'],
  ['02', 'Контроль партии', 'Проверяем внешний вид, свежесть, температуру хранения и пригодность для доставки.'],
  ['03', 'Сборка набора', 'Каждая позиция попадает в упаковку по листу комплектации, а не “на глаз”.'],
  ['04', 'Финальный чек', 'Перед отгрузкой заказ сверяется с заметкой администратора и временем доставки.'],
]

export default function Warehouse() {
  return (
    <div className="min-h-screen">
      <section className="on-photo relative overflow-hidden py-20 sm:py-28">
        <ProductImage product={storageVisual} showFallbackLabel={false} className="absolute inset-0" imgClassName="scale-110" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#07070c_0%,rgba(7,7,12,.9)_45%,rgba(7,7,12,.5)_100%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
              <ShieldCheck className="w-4 h-4" />
              Контроль качества
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl font-black leading-tight">
              Хранение, которое продаёт свежесть
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl">
              Мы показываем клиенту не просто склад, а понятную систему: приёмка, холодовая цепь, комплектация и отгрузка. Это усиливает доверие к фермерскому магазину перед заказом.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {metrics.map(([value, label]) => (
              <AnimatedSection key={label}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                  <p className="text-3xl font-black text-amber-300">{value}</p>
                  <p className="mt-2 text-sm text-white/50">{label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/[0.025]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-black">Маршрут продукта</h2>
            <p className="mt-3 text-white/55 max-w-2xl">Эта схема помогает покупателю понять, почему товар приезжает свежим и почему заказ подтверждается администратором перед оплатой.</p>
          </AnimatedSection>
          <div className="grid lg:grid-cols-4 gap-4">
            {stages.map((stage, index) => (
              <AnimatedSection key={stage.title} delay={index * 80}>
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500/15 border border-amber-500/25">
                      <stage.icon className="w-6 h-6 text-amber-300" />
                    </div>
                    {index < stages.length - 1 && <ArrowRight className="hidden lg:block w-5 h-5 text-white/25" />}
                  </div>
                  <p className="text-sm text-amber-300">{stage.temp}</p>
                  <h3 className="mt-2 text-xl font-bold">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{stage.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10 max-w-3xl">
            <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">Warehouse OS</span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-black">Не склад, а операционная система свежести</h2>
            <p className="theme-muted mt-3 text-white/55">Для презентации мы показываем процесс так, чтобы клиент понимал: его заказ не теряется, не собирается случайно и не оплачивается до проверки.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-4">
            {audit.map(([num, title, text]) => (
              <AnimatedSection key={num}>
                <div className="theme-card h-full rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                  <p className="text-4xl font-black text-amber-300">{num}</p>
                  <h3 className="mt-4 font-bold">{title}</h3>
                  <p className="theme-muted mt-2 text-sm text-white/55">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-6 items-stretch">
            <AnimatedSection>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.055] p-7">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-lime-500/15 border border-lime-500/25">
                  <MapPin className="w-7 h-7 text-lime-300" />
                </div>
                <h2 className="mt-6 text-2xl font-black">Место хранения</h2>
                <p className="mt-3 text-amber-300">{WAREHOUSE.addressFull}</p>
                <p className="mt-4 text-white/55">Склад работает как точка контроля свежести: температура, упаковка, сборка заказов и подготовка к доставке по Беларуси.</p>
                <a href="https://www.google.com/maps/search/Круглянский+район+Свабода+Могилевская" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-[#17150d] px-5 py-3 font-semibold hover:scale-105 transition">
                  Открыть на карте
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-7">
                <Thermometer className="w-10 h-10 text-amber-300 mb-4" />
                <h2 className="text-2xl font-black">Гарантия свежести</h2>
                <p className="mt-4 text-white/60 leading-relaxed">
                  {BRAND.name} хранит продукцию в управляемых условиях и не принимает оплату до подтверждения заказа. Администратор проверяет наличие, согласует доставку и только затем отправляет клиенту способ оплаты.
                </p>
                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  {['Проверка партии', 'Эко-упаковка', 'Контроль отгрузки'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/15 p-4 text-sm text-white/65">{item}</div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}

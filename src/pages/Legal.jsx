import { Cookie, FileText, LockKeyhole, ReceiptText, RotateCcw, Shield } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { BRAND } from '../data/constants'

const documents = [
  {
    id: 'privacy',
    icon: Shield,
    title: 'Политика конфиденциальности',
    text: `${BRAND.name} бережно относится к персональным данным. Мы используем контакты только для обработки заявки, подтверждения состава заказа, согласования доставки и клиентской поддержки.`,
    points: [
      'Мы запрашиваем имя, телефон, email, адрес доставки, состав заказа и комментарий клиента.',
      'Данные не продаются и не передаются третьим лицам для рекламных рассылок.',
      'Клиент может запросить уточнение, исправление или удаление своих данных через поддержку.',
    ],
  },
  {
    id: 'terms',
    icon: ReceiptText,
    title: 'Условия заказа',
    text: 'Оформление на сайте является заявкой на сборку заказа. После отправки заявки оператор проверяет наличие, уточняет детали доставки и подтверждает итоговую сумму.',
    points: [
      'Оплата согласуется после подтверждения состава заказа и наличия товара.',
      'Доступные способы оплаты: ЕРИП, банковская карта, счет для юрлиц, перевод или оплата при получении.',
      'Состав сезонных наборов может уточняться в зависимости от свежего поступления.',
    ],
  },
  {
    id: 'delivery',
    icon: FileText,
    title: 'Доставка',
    text: 'Мы доставляем фермерские продукты по Беларуси с приоритетом на сохранение свежести и аккуратную упаковку.',
    points: [
      'Ориентировочное время доставки по Минску — 24 часа, по регионам — до 48 часов.',
      'Точное время согласуется оператором после подтверждения заказа.',
      'Для офисов, кафе и ресторанов возможны индивидуальные условия поставки.',
    ],
  },
  {
    id: 'returns',
    icon: RotateCcw,
    title: 'Качество и возврат',
    text: 'Если товар приехал не в согласованном качестве, мы разбираем обращение и предлагаем замену, компенсацию или возврат по ситуации.',
    points: [
      'Обращение желательно оставить в течение 24 часов после получения.',
      'Фото товара помогает быстрее принять решение.',
      'Мы фиксируем обратную связь, чтобы улучшать сборку и контроль качества.',
    ],
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookies и хранение в браузере',
    text: 'Сайт использует локальное хранение браузера для корзины и выбранной темы интерфейса. Это помогает не терять заказ при обновлении страницы.',
    points: [
      'Корзина сохраняется на устройстве клиента.',
      'Выбранная светлая или темная тема запоминается браузером.',
      'Очистить эти данные можно в настройках браузера.',
    ],
  },
]

export default function Legal() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 grid lg:grid-cols-[.9fr_1.1fr] gap-8 items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
              <LockKeyhole className="w-4 h-4" />
              Прозрачные правила сервиса
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl font-black leading-tight">Документы без мелкого шрифта и лишней канцелярщины</h1>
          </div>
          <p className="theme-muted text-lg text-white/60">
            Здесь собраны публичные условия: как мы обрабатываем заявки, доставляем продукты, защищаем данные и решаем вопросы качества.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-5">
          {documents.map((doc, index) => (
            <AnimatedSection key={doc.id} delay={index * 70}>
              <article id={doc.id} className="theme-card h-full rounded-3xl border border-white/10 bg-white/[0.055] p-6">
                <doc.icon className="w-10 h-10 text-amber-300 mb-5" />
                <h2 className="text-2xl font-black">{doc.title}</h2>
                <p className="theme-muted mt-4 leading-relaxed text-white/62">{doc.text}</p>
                <div className="mt-5 grid gap-3">
                  {doc.points.map((point) => (
                    <div key={point} className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm theme-muted text-white/58">
                      {point}
                    </div>
                  ))}
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={220} className="mt-8">
          <div className="rounded-3xl border border-amber-500/25 bg-amber-500/10 p-6">
            <div className="flex items-start gap-4">
              <ReceiptText className="w-8 h-8 text-amber-300 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-black">Коротко о главном</h2>
                <p className="theme-muted mt-2 text-white/62">
                  Клиент сначала отправляет заявку. Мы подтверждаем наличие и состав, затем согласуем оплату и доставку. Такой порядок честнее для свежих фермерских продуктов.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

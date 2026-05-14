import { Cookie, FileText, LockKeyhole, ReceiptText, RotateCcw, Shield } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { BRAND } from '../data/constants'

const documents = [
  {
    id: 'privacy',
    icon: Shield,
    title: 'Приватность и данные',
    text: `${BRAND.name} собирает только данные, нужные для заявки: имя, телефон, email, адрес, состав заказа и комментарии. Они нужны, чтобы подтвердить наличие, связаться с клиентом и организовать доставку.`,
    points: ['Доступ к заявкам есть только у владельца/оператора', 'Админка не отображается в публичном меню', 'Данные можно удалить по запросу клиента'],
  },
  {
    id: 'terms',
    icon: ReceiptText,
    title: 'Условия заказа',
    text: 'На MVP клиент отправляет заявку, а не оплачивает заказ сразу. Администратор проверяет наличие, подтверждает состав, согласует доставку и только потом отправляет способ оплаты.',
    points: ['Минимальная разовая заявка — от 200 BYN', 'Подписка оформляется после общения с оператором', 'Состав набора может уточняться по сезону и наличию'],
  },
  {
    id: 'returns',
    icon: RotateCcw,
    title: 'Возврат и качество',
    text: 'Если товар приехал не в согласованном качестве, клиент обращается в поддержку. Оператор фиксирует проблему и предлагает замену, возврат или компенсацию.',
    points: ['Обращение желательно оставить в течение 24 часов', 'Фото товара помогает быстрее принять решение', 'Решение фиксируется в админке как операторская заметка'],
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookies и локальное хранение',
    text: 'Сайт использует локальное хранение для корзины, темы интерфейса и демонстрационной админ-сессии. Это делает MVP удобнее без лишней регистрации.',
    points: ['Корзина сохраняется после обновления страницы', 'Выбранная тема запоминается', 'Можно очистить данные в настройках браузера'],
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
              Доверие до оплаты
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl font-black leading-tight">Правила, которые защищают клиента и владельца</h1>
          </div>
          <p className="theme-muted text-lg text-white/60">Документы написаны человеческим языком: что собираем, как подтверждаем заказ, почему оплаты пока нет и как решаем вопросы качества.</p>
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
              <FileText className="w-8 h-8 text-amber-300 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-black">Что важно для презентации MVP</h2>
                <p className="theme-muted mt-2 text-white/62">Онлайн-оплата намеренно отключена: продукт строится вокруг подтверждения администратором. Это честнее для фермерского магазина, где наличие и свежесть важнее мгновенного списания денег.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ClipboardCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/api'

const initialForm = { name: '', phone: '', email: '', address: '', comment: '' }

function normalizeForm(form) {
  return {
    name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    address: form.address.trim(),
    comment: form.comment.trim(),
  }
}

function validateForm(form) {
  const nextErrors = {}
  if (!form.name) nextErrors.name = 'Укажите имя, чтобы оператор понимал, к кому обращаться.'
  if (!form.phone || form.phone.replace(/\D/g, '').length < 3) {
    nextErrors.phone = 'Укажите телефон или мессенджер для подтверждения заказа.'
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    nextErrors.email = 'Проверьте email или оставьте поле пустым.'
  }
  if (!form.address) nextErrors.address = 'Укажите адрес доставки или район.'
  return nextErrors
}

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const cleanForm = useMemo(() => normalizeForm(form), [form])

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setFieldErrors((current) => ({ ...current, [field]: '' }))
    setError('')
  }

  const goToConfirm = () => {
    const nextErrors = validateForm(cleanForm)
    setFieldErrors(nextErrors)
    setError('')
    if (Object.keys(nextErrors).length === 0) setStep(2)
  }

  const handleSubmitOrder = async () => {
    const nextErrors = validateForm(cleanForm)
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      setStep(1)
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await createOrder({
        customerName: cleanForm.name,
        customerPhone: cleanForm.phone,
        customerEmail: cleanForm.email || null,
        address: cleanForm.address,
        comment: cleanForm.comment || null,
        paymentMethod: 'PAY_AFTER_CONFIRMATION',
        items: items.map((i) => ({
          productId: i.id,
          name: i.name,
          qty: Number(i.qty),
          unit: i.unit,
          price: Number(i.price),
        })),
      })
      setSubmitted(true)
      clearCart()
    } catch (err) {
      setError(err.message || 'Не удалось отправить заявку. Проверьте backend и попробуйте еще раз.')
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">Корзина пустая</p>
          <Link to="/products" className="text-amber-400 hover:underline">Перейти в каталог</Link>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Заявка отправлена</h1>
          <p className="text-white/60 mb-6">
            Администратор уже увидит заказ в админке, проверит наличие и быстро свяжется с вами для подтверждения.
          </p>
          <Link to="/products" className="text-amber-400 hover:underline">Продолжить покупки</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">
            Шаг {step} из 2
          </span>
          <h1 className="text-3xl font-bold mt-4">Оформление заявки</h1>
          <p className="mt-2 text-white/55">
            Оплаты на сайте пока нет: администратор подтвердит наличие и свяжется с вами.
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-4 mb-8 rounded-3xl border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <FieldError text={fieldErrors.name} />
            <input
              placeholder="Имя и фамилия *"
              value={form.name}
              onChange={(e) => updateForm('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none"
            />
            <FieldError text={fieldErrors.phone} />
            <input
              placeholder="Телефон или мессенджер *"
              value={form.phone}
              onChange={(e) => updateForm('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none"
            />
            <FieldError text={fieldErrors.email} />
            <input
              placeholder="Email, если удобно"
              value={form.email}
              onChange={(e) => updateForm('email', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none"
            />
            <FieldError text={fieldErrors.address} />
            <input
              placeholder="Адрес доставки или район *"
              value={form.address}
              onChange={(e) => updateForm('address', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none"
            />
            <textarea
              placeholder="Комментарий: время доставки, замена товара, подъезд"
              value={form.comment}
              onChange={(e) => updateForm('comment', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none resize-none"
            />
            <button
              onClick={goToConfirm}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-lime-600 font-semibold hover:scale-[1.02] transition-all"
            >
              Далее - проверить заявку
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.045] p-5 sm:p-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2">Оплата после подтверждения</h3>
              <div className="flex items-start gap-3 rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-sm text-white/75">
                <ClipboardCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p>
                  Сейчас вы отправляете заявку. Администратор проверит наличие, уточнит доставку и затем пришлет
                  ссылку или реквизиты для оплаты. Можно согласовать оплату при получении.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2">Состав заказа</h3>
              {items.map((i) => (
                <div key={i.id} className="flex justify-between py-2 text-sm gap-4 border-b border-white/10 last:border-b-0">
                  <span>{i.name} × {i.qty} {i.unit}</span>
                  <span className="whitespace-nowrap">{(i.price * i.qty).toFixed(2)} BYN</span>
                </div>
              ))}
              <div className="flex justify-between font-bold pt-4">
                <span>Итого</span>
                <span className="text-amber-400">{total.toFixed(2)} BYN</span>
              </div>
            </div>
            {error && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-white/20">
                Назад
              </button>
              <button
                onClick={() => void handleSubmitOrder()}
                disabled={submitting}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-lime-600 font-semibold hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-wait"
              >
                {submitting ? 'Отправляем...' : 'Отправить заявку'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function FieldError({ text }) {
  if (!text) return null
  return <p className="text-sm text-red-300">{text}</p>
}

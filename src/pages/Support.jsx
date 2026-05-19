import { useState } from 'react'
import { CheckCircle2, Headphones, Mail, MessageCircle, Phone, Send, Truck } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { WAREHOUSE } from '../data/constants'
import { createSupportRequest } from '../services/api'

const quickTopics = ['Подтвердить заказ', 'Собрать набор', 'Доставка сегодня', 'Заказ для ресторана']

export default function Support() {
  const [topic, setTopic] = useState(quickTopics[0])
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    await createSupportRequest({ ...form, topic })
    setSent(true)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid lg:grid-cols-[.9fr_1.1fr] gap-8 items-center mb-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
              <Headphones className="w-4 h-4" />
              Живая поддержка
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl font-black leading-tight">Поможем собрать заказ, а не просто ответим на вопрос</h1>
            <p className="theme-muted mt-5 text-lg text-white/60">Оставьте контакт, и оператор уточнит состав корзины, наличие, доставку и способ оплаты после подтверждения.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <a href={`tel:${WAREHOUSE.phone.replace(/\D/g, '')}`} className="theme-card flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.055] p-5 hover:border-amber-500/35 transition">
                <Phone className="w-8 h-8 text-amber-300" />
                <div><p className="font-bold">Позвонить</p><p className="theme-muted text-sm text-white/55">{WAREHOUSE.phone}</p></div>
              </a>
              <a href={`mailto:${WAREHOUSE.email}`} className="theme-card flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.055] p-5 hover:border-amber-500/35 transition">
                <Mail className="w-8 h-8 text-amber-300" />
                <div><p className="font-bold">Написать</p><p className="theme-muted text-sm text-white/55">{WAREHOUSE.email}</p></div>
              </a>
            </div>
          </div>

          <div className="theme-card rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20">
            <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-lime-500/15 border border-lime-500/25">
                <MessageCircle className="w-6 h-6 text-lime-300" />
              </div>
              <div>
                <p className="font-bold">Оператор SVABODA FARM</p>
                <p className="theme-muted text-sm text-white/50">Ответим и перезвоним для подтверждения</p>
              </div>
            </div>
            <div className="mb-5 rounded-3xl bg-black/20 p-4">
              <p className="text-sm">Здравствуйте! Напишите, что нужно собрать. Если уже есть корзина — уточним наличие и предложим удобное время доставки.</p>
            </div>
            <div className="mb-5 flex flex-wrap gap-2">
              {quickTopics.map((item) => (
                <button key={item} onClick={() => setTopic(item)} className={`rounded-full px-3 py-2 text-sm transition ${topic === item ? 'bg-amber-400 text-[#1c1912]' : 'bg-white/5 border border-white/10 text-white/70'}`}>
                  {item}
                </button>
              ))}
            </div>
            <form onSubmit={submit} className="space-y-3">
              <input value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} placeholder="Имя" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-amber-500/40" />
              <input value={form.phone} onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))} placeholder="Телефон" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-amber-500/40" />
              <textarea value={form.message} onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))} placeholder={`Тема: ${topic}. Что уточнить?`} rows={4} className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-amber-500/40" />
              <button disabled={!form.name || !form.phone} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-lime-600 px-5 py-3 font-semibold disabled:opacity-60">
                <Send className="w-4 h-4" />
                Попросить связаться
              </button>
              {sent && (
                <div className="rounded-2xl border border-lime-500/30 bg-lime-500/10 p-4 text-sm text-lime-200">
                  <p className="flex items-center gap-2 font-semibold"><CheckCircle2 className="w-4 h-4" /> Сообщение отправлено.</p>
                  <p className="mt-1">Оператор уже увидит обращение в админке и свяжется с вами очень быстро.</p>
                </div>
              )}
            </form>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5">
          <AnimatedSection>
            <div className="theme-card rounded-3xl border border-white/10 bg-white/[0.055] p-6">
              <Truck className="w-9 h-9 text-amber-300 mb-4" />
              <h2 className="text-xl font-bold">Доставка</h2>
              <p className="theme-muted mt-2 text-white/60">По Минску — 24 часа. По области — до 48 часов. Время доставки согласуется после подтверждения заказа.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <div className="theme-card rounded-3xl border border-white/10 bg-white/[0.055] p-6">
              <CheckCircle2 className="w-9 h-9 text-amber-300 mb-4" />
              <h2 className="text-xl font-bold">Оплата</h2>
              <p className="theme-muted mt-2 text-white/60">На MVP оплаты на сайте нет. Администратор подтверждает заказ и отправляет удобный способ оплаты или согласует оплату при получении.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}

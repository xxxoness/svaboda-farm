import { useEffect, useMemo, useState } from 'react'
import { BarChart3, CheckCircle2, Clock3, LayoutDashboard, LogOut, RefreshCw, Settings, Shield, Truck, Users, XCircle } from 'lucide-react'
import { adminLogin, getAdminOrders, getAdminSupportRequests, updateAdminOrderStatus, updateAdminSupportRequest } from '../services/api'

const TOKEN_KEY = 'svaboda_admin_token'

const STATUS_LABELS = {
  NEW: 'Новый',
  CONFIRMED: 'Подтвержден',
  FULFILLED: 'Выполнен',
  CANCELLED: 'Отменен',
}

const STATUS_STYLES = {
  NEW: 'border-amber-500/35 bg-amber-500/10 text-amber-200',
  CONFIRMED: 'border-lime-500/35 bg-lime-500/10 text-lime-200',
  FULFILLED: 'border-sky-500/35 bg-sky-500/10 text-sky-200',
  CANCELLED: 'border-red-500/35 bg-red-500/10 text-red-200',
}

const tabs = [
  { id: 'overview', label: 'Обзор', icon: LayoutDashboard },
  { id: 'orders', label: 'Заказы', icon: Truck },
  { id: 'operator', label: 'Оператор', icon: Clock3 },
  { id: 'clients', label: 'Клиенты', icon: Users },
  { id: 'settings', label: 'Настройки', icon: Settings },
]

function normalizeOrder(order) {
  return {
    ...order,
    createdAtLabel: new Date(order.createdAt).toLocaleString('ru-RU'),
    total: Number(order.total),
    items: order.items.map((item) => ({ ...item, qty: Number(item.qty), price: Number(item.price) })),
  }
}

export default function Admin() {
  const [token, setToken] = useState(() => window.localStorage.getItem(TOKEN_KEY) || '')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [orders, setOrders] = useState([])
  const [supportRequests, setSupportRequests] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [error, setError] = useState('')
  const [notes, setNotes] = useState({})

  const stats = useMemo(() => {
    const uniquePhones = new Set()
    const result = orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        acc.total += order.total
        uniquePhones.add(order.customerPhone)
        return acc
      },
      { NEW: 0, CONFIRMED: 0, FULFILLED: 0, CANCELLED: 0, total: 0 }
    )
    result.clients = uniquePhones.size
    result.average = orders.length ? result.total / orders.length : 0
    return result
  }, [orders])

  const clients = useMemo(() => {
    const map = new Map()
    orders.forEach((order) => {
      const key = order.customerPhone
      const current = map.get(key) || { name: order.customerName, phone: key, email: order.customerEmail, orders: 0, total: 0 }
      current.orders += 1
      current.total += order.total
      map.set(key, current)
    })
    return [...map.values()].sort((a, b) => b.total - a.total)
  }, [orders])

  const loadOrders = async (activeToken = token) => {
    if (!activeToken) return
    setLoading(true)
    setError('')
    try {
      const data = await getAdminOrders(activeToken)
      const support = await getAdminSupportRequests(activeToken)
      const normalized = data.map(normalizeOrder)
      setOrders(normalized)
      setSupportRequests(support)
      setNotes(Object.fromEntries(normalized.map((order) => [order.id, order.adminNote || ''])))
    } catch {
      setError('Не удалось загрузить заказы. Проверьте backend или войдите заново.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) void loadOrders(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const onSubmit = async (e) => {
    e.preventDefault()
    setAuthError('')
    setLoading(true)
    try {
      const { token: nextToken } = await adminLogin(login, password)
      window.localStorage.setItem(TOKEN_KEY, nextToken)
      setToken(nextToken)
      setPassword('')
    } catch {
      setAuthError('Неверный email/пароль или backend недоступен.')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    window.localStorage.removeItem(TOKEN_KEY)
    setToken('')
    setOrders([])
  }

  const changeStatus = async (order, status) => {
    setError('')
    try {
      const updated = await updateAdminOrderStatus(token, order.id, {
        status,
        adminNote: notes[order.id] || null,
      })
      setOrders((current) => current.map((item) => (item.id === order.id ? normalizeOrder(updated) : item)))
    } catch {
      setError('Не удалось обновить заказ. Проверьте соединение с backend.')
    }
  }

  const changeSupportStatus = async (request, status) => {
    const updated = await updateAdminSupportRequest(token, request.id, {
      status,
      operatorNote: request.operatorNote || null,
    })
    setSupportRequests((current) => current.map((item) => (item.id === request.id ? updated : item)))
  }

  if (!token) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="rounded-3xl bg-white/[0.06] border border-white/10 p-7 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500/15 border border-amber-500/25">
                <Shield className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Панель владельца</h1>
                <p className="text-sm text-white/45">Заказы, клиенты и операционный контроль</p>
              </div>
            </div>
            <form onSubmit={onSubmit} className="space-y-3">
              <input value={login} onChange={(e) => setLogin(e.target.value)} type="email" autoComplete="username" placeholder="Email" className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/40" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" placeholder="Пароль" className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/40" />
              {authError && <p className="text-sm text-red-300">{authError}</p>}
              <button disabled={loading || !login || !password} className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-lime-600 font-semibold disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Проверяем...' : 'Войти'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const metricCards = [
    { label: 'Новые заявки', value: stats.NEW, hint: 'требуют звонка', tone: 'text-amber-300' },
    { label: 'Вопросы оператору', value: supportRequests.filter((item) => item.status !== 'CLOSED').length, hint: 'ожидают ответа', tone: 'text-rose-300' },
    { label: 'Подтверждено', value: stats.CONFIRMED, hint: 'ожидают оплаты/доставки', tone: 'text-lime-300' },
    { label: 'Клиенты', value: stats.clients, hint: 'уникальные телефоны', tone: 'text-sky-300' },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between mb-8">
          <div>
            <span className="inline-flex rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">Admin workspace</span>
            <h1 className="text-4xl font-black mt-4">Панель владельца</h1>
            <p className="text-white/50 mt-2 max-w-2xl">Контроль заявок, клиентов, подтверждений и операционных заметок. Оплата остается вне сайта до подтверждения администратором.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void loadOrders()} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:bg-white/5 disabled:opacity-60">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Обновить
            </button>
            <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:bg-white/5">
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[0.045] p-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition ${activeTab === tab.id ? 'bg-white text-[#17150d]' : 'text-white/65 hover:bg-white/[0.08] hover:text-white'}`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {error && <p className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {metricCards.map((card) => (
                <div key={card.label} className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                  <p className="text-sm text-white/45">{card.label}</p>
                  <p className={`mt-2 text-3xl font-black ${card.tone}`}>{card.value}</p>
                  <p className="mt-2 text-xs text-white/40">{card.hint}</p>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-[1.4fr_.8fr] gap-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-amber-300" />
                  <h2 className="font-bold">Операционная воронка</h2>
                </div>
                {['NEW', 'CONFIRMED', 'FULFILLED', 'CANCELLED'].map((status) => {
                  const width = orders.length ? Math.max(8, (stats[status] / orders.length) * 100) : 0
                  return (
                    <div key={status} className="mb-4">
                      <div className="flex justify-between text-sm mb-2"><span>{STATUS_LABELS[status]}</span><span className="text-white/45">{stats[status]}</span></div>
                      <div className="h-3 rounded-full bg-white/[0.08] overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-lime-500" style={{ width: `${width}%` }} /></div>
                    </div>
                  )
                })}
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                <Clock3 className="w-6 h-6 text-amber-300 mb-3" />
                <h2 className="font-bold">Регламент подтверждения</h2>
                <p className="mt-3 text-sm text-white/55">1. Проверить наличие. 2. Позвонить клиенту. 3. Записать заметку с оплатой/доставкой. 4. Нажать “Подтвердить”. 5. После выдачи отметить “Выполнен”.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          orders.length === 0 ? <p className="text-white/60">{loading ? 'Загружаем заказы...' : 'Пока нет заказов.'}</p> : (
            <div className="space-y-4">
              {orders.map((order) => (
                <article key={order.id} className="rounded-3xl bg-white/[0.055] border border-white/10 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="font-bold">Заказ #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-white/45">{order.createdAtLabel}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-sm ${STATUS_STYLES[order.status]}`}>{STATUS_LABELS[order.status] || order.status}</span>
                  </div>
                  <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-5">
                    <div className="space-y-2 text-sm">
                      <p className="text-white/85 font-medium">{order.customerName}</p>
                      <a href={`tel:${order.customerPhone.replace(/\D/g, '')}`} className="text-amber-300 hover:underline">{order.customerPhone}</a>
                      {order.customerEmail && <a href={`mailto:${order.customerEmail}`} className="block text-amber-300 hover:underline">{order.customerEmail}</a>}
                      <p className="text-white/55">{order.address}</p>
                      {order.comment && <p className="text-white/45">Комментарий: {order.comment}</p>}
                    </div>
                    <div>
                      <div className="space-y-1 text-sm text-white/65 mb-3">
                        {order.items.map((item) => <p key={item.id}>{item.name} x {item.qty} {item.unit} = {(item.price * item.qty).toFixed(2)} BYN</p>)}
                      </div>
                      <p className="font-black text-amber-300 mb-4">Итого: {order.total.toFixed(2)} BYN</p>
                      <textarea value={notes[order.id] || ''} onChange={(e) => setNotes((current) => ({ ...current, [order.id]: e.target.value }))} rows={2} placeholder="Заметка: клиенту отправлена ссылка на оплату, доставка завтра 12:00-15:00" className="w-full px-3 py-2 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-amber-500/40 resize-none text-sm" />
                      <div className="grid sm:grid-cols-3 gap-2 mt-3">
                        <button onClick={() => void changeStatus(order, 'CONFIRMED')} className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-2xl bg-lime-500/15 border border-lime-500/30 text-lime-200 text-sm hover:bg-lime-500/20"><CheckCircle2 className="w-4 h-4" />Подтвердить</button>
                        <button onClick={() => void changeStatus(order, 'FULFILLED')} className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-200 text-sm hover:bg-sky-500/20"><Truck className="w-4 h-4" />Выполнен</button>
                        <button onClick={() => void changeStatus(order, 'CANCELLED')} className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-200 text-sm hover:bg-red-500/20"><XCircle className="w-4 h-4" />Отменить</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )
        )}

        {activeTab === 'operator' && (
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-5">
            <div className="theme-card rounded-3xl border border-white/10 bg-white/[0.055] p-5">
              <h2 className="text-xl font-black">Работа оператора</h2>
              <p className="theme-muted mt-2 text-sm text-white/55">Новые сообщения из формы поддержки попадают сюда. Оператор видит тему, контакт и может отметить этап обработки.</p>
              <div className="mt-5 space-y-3 text-sm">
                <div className="rounded-2xl bg-amber-500/10 border border-amber-500/25 p-4">NEW — нужно связаться</div>
                <div className="rounded-2xl bg-sky-500/10 border border-sky-500/25 p-4">IN_PROGRESS — оператор взял в работу</div>
                <div className="rounded-2xl bg-lime-500/10 border border-lime-500/25 p-4">CLOSED — вопрос закрыт</div>
              </div>
            </div>
            <div className="space-y-4">
              {supportRequests.length === 0 ? (
                <p className="theme-card rounded-3xl border border-white/10 bg-white/[0.055] p-5 text-white/55">Пока нет обращений.</p>
              ) : supportRequests.map((request) => (
                <article key={request.id} className="theme-card rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <p className="font-black">{request.topic}</p>
                      <p className="theme-muted text-sm text-white/50">{new Date(request.createdAt).toLocaleString('ru-RU')}</p>
                    </div>
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/25 px-3 py-1 text-sm text-amber-300">{request.status}</span>
                  </div>
                  <div className="mt-4 grid md:grid-cols-[.8fr_1.2fr] gap-4">
                    <div className="text-sm">
                      <p className="font-semibold">{request.name}</p>
                      <a href={`tel:${request.phone.replace(/\D/g, '')}`} className="text-amber-300 hover:underline">{request.phone}</a>
                    </div>
                    <p className="theme-muted text-sm text-white/65">{request.message}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => void changeSupportStatus(request, 'IN_PROGRESS')} className="rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-200">Взять в работу</button>
                    <button onClick={() => void changeSupportStatus(request, 'CLOSED')} className="rounded-2xl border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-sm text-lime-200">Закрыть</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.055] overflow-hidden">
            {clients.length === 0 ? <p className="p-5 text-white/55">Клиенты появятся после первых заказов.</p> : clients.map((client) => (
              <div key={client.phone} className="grid gap-2 border-b border-white/10 p-5 last:border-b-0 sm:grid-cols-4">
                <p className="font-medium">{client.name}</p>
                <p className="text-white/55">{client.phone}</p>
                <p className="text-white/55">{client.orders} заказ(а)</p>
                <p className="text-amber-300 font-bold">{client.total.toFixed(2)} BYN</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
              <h2 className="font-bold mb-3">Доступ владельца</h2>
              <p className="text-sm text-white/55">Логин и пароль хранятся в `backend/.env`. Перед публикацией поменяйте `ADMIN_EMAIL`, `ADMIN_PASSWORD` и `JWT_SECRET`.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
              <h2 className="font-bold mb-3">Хранилище заказов</h2>
              <p className="text-sm text-white/55">Для презентации используется `backend/data/orders.json`. API уже отделен от frontend, поэтому позже можно подключить PostgreSQL, SMS, оплату и складской учет.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

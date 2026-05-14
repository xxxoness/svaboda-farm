import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, ChevronDown, Moon, Sun } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import CartDrawer from './CartDrawer'
import Logo from './Logo'

const navLinks = [
  { to: '/', label: 'Главная' },
  {
    label: 'Каталог',
    children: [
      { to: '/products?cat=vegetables', label: 'Овощи' },
      { to: '/products?cat=fruits', label: 'Фрукты' },
      { to: '/products?cat=greens', label: 'Зелень' },
      { to: '/products?cat=sets', label: 'Наборы' },
    ],
  },
  { to: '/warehouse', label: 'Хранение' },
  {
    label: 'Компания',
    children: [
      { to: '/company', label: 'О нас' },
      { to: '/support', label: 'Поддержка' },
    ],
  },
  { to: '/legal', label: 'Документы' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <>
      <nav className={`theme-nav fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? 'bg-[#07070c]/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            <Logo className="shrink-0" />

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdown(link.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    <button
                      onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                      className="flex items-center gap-1 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/[0.08] text-sm font-medium"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${dropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdown === link.label && (
                      <div className="absolute left-0 top-full w-56 pt-2">
                        <div className="rounded-2xl bg-[#0a0a10]/98 border border-white/10 shadow-2xl shadow-black/30 backdrop-blur-xl p-2">
                          {link.children.map((c) => (
                            <Link key={c.to} to={c.to} className="block rounded-xl px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/[0.08]">
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      location.pathname === link.to ? 'bg-white/[0.08] text-amber-300' : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Переключить тему"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-amber-700" />}
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Открыть корзину"
              >
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>
              <Link
                to="/products"
                className="hidden sm:inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-lime-600 font-semibold text-sm hover:scale-105 transition-all"
              >
                Каталог
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-white/10" aria-label="Открыть меню">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#07070c]/98 backdrop-blur-xl py-4 px-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-4 py-2 text-white/50 text-sm">{link.label}</p>
                    {link.children.map((c) => (
                      <Link key={c.to} to={c.to} onClick={() => setMobileOpen(false)} className="block px-6 py-2 text-white/80 hover:text-white">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5">
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

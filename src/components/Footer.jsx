import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { BRAND, WAREHOUSE } from '../data/constants'
import Logo from './Logo'

const links = {
  Каталог: [
    { to: '/products?cat=vegetables', label: 'Овощи' },
    { to: '/products?cat=fruits', label: 'Фрукты' },
    { to: '/products?cat=greens', label: 'Зелень' },
    { to: '/products?cat=sets', label: 'Наборы' },
  ],
  Компания: [
    { to: '/company', label: 'О нас' },
    { to: '/warehouse', label: 'Хранение' },
    { to: '/support', label: 'Поддержка' },
  ],
  Документы: [
    { to: '/legal#privacy', label: 'Конфиденциальность' },
    { to: '/legal#terms', label: 'Условия' },
    { to: '/legal#cookies', label: 'Cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="py-16 border-t border-white/10 bg-[#050508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-4" />
            <p className="text-white/60 text-sm mb-4">{BRAND.description}</p>
            <div className="space-y-2 text-sm">
              <a href={`tel:${WAREHOUSE.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-white/60 hover:text-amber-400">
                <Phone className="w-4 h-4" /> {WAREHOUSE.phone}
              </a>
              <a href={`mailto:${WAREHOUSE.email}`} className="flex items-center gap-2 text-white/60 hover:text-amber-400">
                <Mail className="w-4 h-4" /> {WAREHOUSE.email}
              </a>
              <p className="flex items-start gap-2 text-white/60">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> {WAREHOUSE.address}
              </p>
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-white/60 hover:text-amber-400 text-sm">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          © 2025 {BRAND.name}. Могилёвская обл., Круглянский р-н, д. Свабода.
        </div>
      </div>
    </footer>
  )
}

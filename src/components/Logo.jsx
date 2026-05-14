import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'
import { BRAND } from '../data/constants'

export default function Logo({ compact = false, className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 via-lime-400 to-emerald-500 shadow-lg shadow-amber-900/20">
        <div className="absolute inset-[3px] rounded-[14px] border border-white/45" />
        <Sprout className="h-5 w-5 text-[#16330f]" strokeWidth={2.8} />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-black tracking-wide text-white">{BRAND.name}</p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-amber-200/75">farm market</p>
        </div>
      )}
    </Link>
  )
}

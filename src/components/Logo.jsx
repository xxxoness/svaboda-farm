import { Link } from 'react-router-dom'
import { BRAND } from '../data/constants'

const assetUrl = (src) => {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${src.replace(/^\//, '')}`
}

export default function Logo({ compact = false, className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 ${className}`} aria-label={BRAND.name}>
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/95 p-1.5 shadow-xl shadow-black/15 ring-1 ring-black/10">
        <img
          src={assetUrl('/assets/brand/svaboda-mark.png')}
          alt=""
          className="h-full w-full object-contain"
          loading="eager"
        />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-black tracking-wide text-white theme-heading">{BRAND.name}</p>
          <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/75 theme-muted">farm market</p>
        </div>
      )}
    </Link>
  )
}

import { useState } from 'react'
import { ImageOff } from 'lucide-react'

function assetUrl(src) {
  if (!src || src.startsWith('http') || src.startsWith('data:')) return src
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${src.replace(/^\//, '')}`
}

export default function ProductImage({ product, className = '', imgClassName = '', showFallbackLabel = true, loading = 'lazy', children }) {
  const [failed, setFailed] = useState(false)
  const fallback = product?.fallback || 'from-emerald-700 via-lime-700 to-amber-600'

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${fallback} ${className}`}>
      {product?.img && !failed && (
        <img
          src={assetUrl(product.img)}
          alt={product.name}
          loading={loading}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          style={{ objectPosition: product?.imagePosition || 'center' }}
          className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      {failed && showFallbackLabel && (
        <div className="absolute inset-0 flex items-end p-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/35 border border-white/15 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <ImageOff className="w-3.5 h-3.5" />
            Свежий урожай
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

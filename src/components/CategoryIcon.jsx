import {
  Building2,
  ShoppingBasket,
  Zap,
  Car,
  Flame,
  Droplets,
  Wifi,
  Store,
  Stethoscope,
  WalletCards,
} from 'lucide-react'
import { categoryIcons, categoryColors } from '../lib/constants'

const iconMap = {
  Building2,
  ShoppingBasket,
  Zap,
  Car,
  Flame,
  Drop: Droplets,
  Droplets,
  Wifi,
  Store,
  Stethoscope,
  WalletCards,
}

export default function CategoryIcon({
  category,
  size = 18,
  className = '',
  containerClassName = 'size-10 rounded-xl',
}) {
  const iconName = categoryIcons[category] || 'WalletCards'
  const IconComponent = iconMap[iconName] || WalletCards
  const badgeClass = categoryColors[category] || 'bg-emerald-600'

  return (
    <div
      className={`grid place-items-center text-white shrink-0 shadow-sm ${badgeClass} ${containerClassName} ${className}`}
      title={category}
    >
      <IconComponent size={size} strokeWidth={2.2} />
    </div>
  )
}

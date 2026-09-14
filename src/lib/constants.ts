import { Category } from "../types"

export const categories: Category[] = [
  { name: 'Home Rent', color: 'var(--category-rent)' },
  { name: 'Grocery', color: 'var(--category-grocery)' },
  { name: 'Electricity Bill', color: 'var(--category-electricity)' },
  { name: 'Vehicle Gas', color: 'var(--category-vehicle)' },
  { name: 'Gas Bill', color: 'var(--category-gas)' },
  { name: 'Water Bill', color: 'var(--category-water)' },
  { name: 'Uncle Store Payment', color: 'var(--category-uncle)' },
]

export const categoryColors: Record<string, string> = {
  'Home Rent': 'bg-indigo-500',
  'Grocery': 'bg-amber-500',
  'Electricity Bill': 'bg-emerald-500',
  'Vehicle Gas': 'bg-violet-500',
  'Gas Bill': 'bg-cyan-500',
  'Water Bill': 'bg-blue-500',
  'Uncle Store Payment': 'bg-pink-500',
}

export const categoryIcons: Record<string, string> = {
  'Home Rent': 'Building2',
  'Grocery': 'ShoppingBasket',
  'Electricity Bill': 'Zap',
  'Vehicle Gas': 'Car',
  'Gas Bill': 'Flame',
  'Water Bill': 'Drop',
  'Uncle Store Payment': 'Store',
}

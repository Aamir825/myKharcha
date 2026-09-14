import { useEffect, useMemo, useState } from 'react'

export const categories = [
  { name: 'Home Rent', color: '#047857' },
  { name: 'Grocery', color: '#d97706' },
  { name: 'Electricity Bill', color: '#059669' },
  { name: 'Vehicle Gas', color: '#b45309' },
  { name: 'Gas Bill', color: '#0d9488' },
  { name: 'Water Bill', color: '#0284c7' },
  { name: 'Uncle Store Payment', color: '#ca8a04' },
]

const initialExpenses = [
  { id: 1, date: '2026-09-14', category: 'Grocery', description: 'Vegetables & pantry', amount: 2450 },
  { id: 2, date: '2026-09-13', category: 'Vehicle Gas', description: 'Honda City', amount: 1000 },
  { id: 3, date: '2026-09-12', category: 'Electricity Bill', description: 'September bill', amount: 12500 },
  { id: 4, date: '2026-09-10', category: 'Grocery', description: 'Milk & yogurt', amount: 850 },
  { id: 5, date: '2026-09-07', category: 'Uncle Store Payment', description: 'Monthly payment', amount: 6000 },
]

const readExpenses = () => {
  try {
    return JSON.parse(localStorage.getItem('mykharcha-expenses')) || initialExpenses
  } catch {
    return initialExpenses
  }
}

export const money = (value) => `PKR ${Math.round(value).toLocaleString('en-PK')}`

export function useMyKharcha() {
  const [monthDate, setMonthDate] = useState(new Date(2026, 8, 1))
  const [expenses, setExpenses] = useState(readExpenses)
  const [selectedDate, setSelectedDate] = useState('2026-09-14')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => localStorage.getItem('mykharcha-theme') === 'dark')
  const [budget, setBudget] = useState(() => Number(localStorage.getItem('mykharcha-budget')) || 140000)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All categories')

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('mykharcha-theme', isDark ? 'dark' : 'light')
  }, [isDark])
  const [form, setForm] = useState({ date: '2026-09-14', category: 'Grocery', amount: '', description: '' })

  const monthId = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`
  const monthExpenses = useMemo(() => expenses.filter((expense) => expense.date.startsWith(monthId)), [expenses, monthId])
  const spent = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const remaining = budget - spent
  const percent = Math.min(100, Math.round((spent / budget) * 100))
  const categoryTotals = useMemo(() => categories.map((category) => ({ ...category, total: monthExpenses.filter((expense) => expense.category === category.name).reduce((sum, expense) => sum + expense.amount, 0) })).filter((category) => category.total > 0).sort((a, b) => b.total - a.total), [monthExpenses])
  const dailyTotals = useMemo(() => Array.from({ length: new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate() }, (_, index) => monthExpenses.filter((expense) => Number(expense.date.slice(-2)) === index + 1).reduce((sum, expense) => sum + expense.amount, 0)), [monthExpenses, monthDate])
  const selectedExpenses = monthExpenses.filter((expense) => expense.date === selectedDate)
  const selectedTotal = selectedExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const filteredExpenses = useMemo(() => monthExpenses.filter((expense) => {
    const matchesSearch = `${expense.category} ${expense.description}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'All categories' || expense.category === filterCategory
    return matchesSearch && matchesCategory
  }), [monthExpenses, searchTerm, filterCategory])
  const maxDaily = Math.max(...dailyTotals, 1)
  const remainingDays = Math.max(0, new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate() - new Date().getDate())

  const persistExpenses = (nextExpenses) => {
    setExpenses(nextExpenses)
    localStorage.setItem('mykharcha-expenses', JSON.stringify(nextExpenses))
  }

  const changeMonth = (offset) => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + offset, 1))
  const openAdd = (date = selectedDate) => {
    setForm({ date, category: 'Grocery', amount: '', description: '' })
    setIsAddOpen(true)
  }
  const addExpense = (event) => {
    event.preventDefault()
    if (!form.amount || Number(form.amount) <= 0) return
    persistExpenses([{ ...form, id: Date.now(), amount: Number(form.amount) }, ...expenses])
    setSelectedDate(form.date)
    setIsAddOpen(false)
  }
  const deleteExpense = (id) => persistExpenses(expenses.filter((expense) => expense.id !== id))
  const saveBudget = (value) => {
    const nextBudget = Number(value)
    if (!nextBudget || nextBudget < 0) return
    setBudget(nextBudget)
    localStorage.setItem('mykharcha-budget', String(nextBudget))
  }

  return {
    categories,
    monthDate,
    monthExpenses,
    selectedDate,
    selectedExpenses,
    selectedTotal,
    dailyTotals,
    maxDaily,
    remainingDays,
    dailySafeSpend: Math.max(remaining, 0) / Math.max(remainingDays, 1),
    categoryTotals,
    budget,
    spent,
    remaining,
    percent,
    isAddOpen,
    isDark,
    searchTerm,
    filterCategory,
    filteredExpenses,
    form,
    setForm,
    setSelectedDate,
    setIsAddOpen,
    setIsDark,
    setSearchTerm,
    setFilterCategory,
    changeMonth,
    openAdd,
    addExpense,
    deleteExpense,
    saveBudget,
  }
}

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

  const [editingExpense, setEditingExpense] = useState(null)
  const [deletingExpense, setDeletingExpense] = useState(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

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
    const matchesSearch = `${expense.category} ${expense.description || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
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
    setEditingExpense(null)
    setForm({ date, category: 'Grocery', amount: '', description: '' })
    setIsAddOpen(true)
  }

  const openEdit = (expense) => {
    setEditingExpense(expense)
    setForm({
      date: expense.date,
      category: expense.category,
      amount: String(expense.amount),
      description: expense.description || '',
    })
    setIsAddOpen(true)
  }

  const openDelete = (expense) => {
    setDeletingExpense(expense)
    setIsDeleteOpen(true)
  }

  const saveExpense = (data) => {
    if (!data.amount || Number(data.amount) <= 0) return
    if (data.id) {
      // Edit existing expense
      const updated = expenses.map((exp) => (exp.id === data.id ? { ...exp, ...data, amount: Number(data.amount) } : exp))
      persistExpenses(updated)
    } else {
      // Add new expense
      const newExpense = {
        id: Date.now(),
        date: data.date,
        category: data.category,
        amount: Number(data.amount),
        description: data.description || '',
      }
      persistExpenses([newExpense, ...expenses])
      setSelectedDate(data.date)
    }
    setEditingExpense(null)
    setIsAddOpen(false)
  }

  const confirmDelete = (id) => {
    const targetId = id || deletingExpense?.id
    if (!targetId) return
    persistExpenses(expenses.filter((expense) => expense.id !== targetId))
    setDeletingExpense(null)
    setIsDeleteOpen(false)
  }

  useEffect(() => {
    const handleOpenAdd = (event) => {
      const date = event.detail?.date || selectedDate
      openAdd(date)
    }
    window.addEventListener('open-add-expense', handleOpenAdd)
    return () => window.removeEventListener('open-add-expense', handleOpenAdd)
  }, [selectedDate])

  const addExpense = (event) => {
    if (event?.preventDefault) event.preventDefault()
    if (!form.amount || Number(form.amount) <= 0) return
    if (editingExpense) {
      saveExpense({ ...form, id: editingExpense.id })
    } else {
      saveExpense(form)
    }
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
    editingExpense,
    deletingExpense,
    isDeleteOpen,
    setForm,
    setSelectedDate,
    setIsAddOpen,
    setEditingExpense,
    setDeletingExpense,
    setIsDeleteOpen,
    setIsDark,
    setSearchTerm,
    setFilterCategory,
    changeMonth,
    openAdd,
    openEdit,
    openDelete,
    saveExpense,
    confirmDelete,
    addExpense,
    deleteExpense,
    saveBudget,
  }
}

import { createContext, useContext, useEffect, useState } from 'react'

export const defaultCategories = [
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

const KharchaContext = createContext(null)

export function KharchaProvider({ children }) {
  const [expenses, setExpenses] = useState(readExpenses)
  const [categories, setCategories] = useState(defaultCategories)
  const [budget, setBudget] = useState(() => Number(localStorage.getItem('mykharcha-budget')) || 140000)
  const [isDark, setIsDark] = useState(() => localStorage.getItem('mykharcha-theme') === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('mykharcha-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const persistExpenses = (nextExpenses) => {
    setExpenses(nextExpenses)
    localStorage.setItem('mykharcha-expenses', JSON.stringify(nextExpenses))
  }

  const saveBudget = (value) => {
    const nextBudget = Number(value)
    if (!nextBudget || nextBudget < 0) return
    setBudget(nextBudget)
    localStorage.setItem('mykharcha-budget', String(nextBudget))
  }

  const addExpense = (data) => {
    const newExpense = {
      id: Date.now(),
      date: data.date,
      category: data.category,
      amount: Number(data.amount),
      description: data.description || '',
    }
    const updated = [newExpense, ...expenses]
    persistExpenses(updated)
    return newExpense
  }

  const updateExpense = (id, data) => {
    const updated = expenses.map((exp) =>
      exp.id === id ? { ...exp, ...data, amount: Number(data.amount) } : exp
    )
    persistExpenses(updated)
  }

  const deleteExpense = (id) => {
    const updated = expenses.filter((exp) => exp.id !== id)
    persistExpenses(updated)
  }

  return (
    <KharchaContext.Provider
      value={{
        expenses,
        categories,
        budget,
        isDark,
        setCategories,
        setIsDark,
        saveBudget,
        addExpense,
        updateExpense,
        deleteExpense,
        persistExpenses,
      }}
    >
      {children}
    </KharchaContext.Provider>
  )
}

export function useKharchaContext() {
  const context = useContext(KharchaContext)
  if (!context) {
    throw new Error('useKharchaContext must be used within a KharchaProvider')
  }
  return context
}

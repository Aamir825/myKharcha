import { useMemo, useState } from 'react'
import { categories } from '../lib/constants'
import { getMonthId } from '../utils/formatters'
import { useAuth } from './useAuth'
import { useBudget } from './useBudget'
import { useExpensesData } from './useExpensesData'

export function useDashboard() {
  const {
    expenses,
    isAddOpen,
    editingExpense,
    isDeleteOpen,
    deletingExpense,
    defaultDate,
    openAdd,
    openEdit,
    setIsAddOpen,
    openDelete,
    setIsDeleteOpen,
    saveExpense,
    confirmDelete,
  } = useExpensesData()

  const { budget } = useBudget()
  const { displayName } = useAuth()

  const now = new Date()
  const [monthDate, setMonthDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1)
  )
  const [selectedDate, setSelectedDate] = useState(
    now.toISOString().split('T')[0]
  )

  const monthId = getMonthId(monthDate)

  const monthExpenses = useMemo(
    () => expenses.filter((e) => e.date.startsWith(monthId)),
    [expenses, monthId]
  )

  const spent = useMemo(
    () => monthExpenses.reduce((sum, e) => sum + e.amount, 0),
    [monthExpenses]
  )

  const remaining = budget - spent
  const percent = Math.min(100, Math.round((spent / Math.max(budget, 1)) * 100))

  const categoryTotals = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          total: monthExpenses
            .filter((e) => e.category === category.name)
            .reduce((sum, e) => sum + e.amount, 0),
        }))
        .filter((c) => c.total > 0)
        .sort((a, b) => b.total - a.total),
    [monthExpenses, categories]
  )

  const daysInMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0
  ).getDate()

  const dailyTotals = useMemo(
    () =>
      Array.from({ length: daysInMonth }, (_, index) =>
        monthExpenses
          .filter((e) => Number(e.date.slice(-2)) === index + 1)
          .reduce((sum, e) => sum + e.amount, 0)
      ),
    [monthExpenses, daysInMonth]
  )

  const selectedExpenses = useMemo(
    () => monthExpenses.filter((e) => e.date === selectedDate),
    [monthExpenses, selectedDate]
  )

  const selectedTotal = useMemo(
    () => selectedExpenses.reduce((sum, e) => sum + e.amount, 0),
    [selectedExpenses]
  )

  const maxDaily = Math.max(...dailyTotals, 1)
  const remainingDays = Math.max(0, daysInMonth - now.getDate())
  const dailySafeSpend = Math.max(remaining, 0) / Math.max(remainingDays, 1)

  const changeMonth = (offset) =>
    setMonthDate(
      new Date(monthDate.getFullYear(), monthDate.getMonth() + offset, 1)
    )

  const goToToday = () => {
    const today = new Date()
    setMonthDate(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(today.toISOString().split('T')[0])
  }

  const handleOpenAddForSelected = (date = selectedDate) => {
    openAdd(date)
  }

  return {
    displayName,
    monthDate,
    selectedDate,
    selectedExpenses,
    selectedTotal,
    dailyTotals,
    maxDaily,
    remainingDays,
    dailySafeSpend,
    categoryTotals,
    categories,
    budget,
    spent,
    remaining,
    percent,
    daysInMonth,
    // Delegated Modal State & Actions
    isAddOpen,
    editingExpense,
    deletingExpense,
    isDeleteOpen,
    defaultDate,
    setSelectedDate,
    setIsAddOpen,
    setIsDeleteOpen,
    changeMonth,
    goToToday,
    openAdd: handleOpenAddForSelected,
    openEdit,
    openDelete,
    saveExpense,
    confirmDelete,
  }
}

import { useMemo, useState } from 'react'
import { categories } from '../lib/constants'
import { getMonthId } from '../utils/formatters'
import { useExpensesData } from './useExpensesData'

export function useCalendar() {
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

  const changeMonth = (offset) =>
    setMonthDate(
      new Date(monthDate.getFullYear(), monthDate.getMonth() + offset, 1)
    )

  const handleOpenAddForSelected = (date = selectedDate) => {
    openAdd(date)
  }

  return {
    monthDate,
    dailyTotals,
    selectedDate,
    selectedExpenses,
    selectedTotal,
    categories,
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
    openAdd: handleOpenAddForSelected,
    openEdit,
    openDelete,
    saveExpense,
    confirmDelete,
  }
}

import { useEffect, useMemo, useState } from 'react'
import { useKharchaContext } from '../context/KharchaContext'
import { getMonthId } from '../utils/formatters'

export function useCalendar() {
  const {
    expenses,
    categories,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useKharchaContext()

  const [monthDate, setMonthDate] = useState(new Date(2026, 8, 1))
  const [selectedDate, setSelectedDate] = useState('2026-09-14')

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [deletingExpense, setDeletingExpense] = useState(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

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

  const openAdd = (date = selectedDate) => {
    setEditingExpense(null)
    setSelectedDate(date)
    setIsAddOpen(true)
  }

  const openEdit = (expense) => {
    setEditingExpense(expense)
    setIsAddOpen(true)
  }

  const openDelete = (expense) => {
    setDeletingExpense(expense)
    setIsDeleteOpen(true)
  }

  const saveExpense = (data) => {
    if (!data.amount || Number(data.amount) <= 0) return
    if (data.id) {
      updateExpense(data.id, data)
    } else {
      addExpense(data)
      setSelectedDate(data.date)
    }
    setEditingExpense(null)
    setIsAddOpen(false)
  }

  const confirmDelete = (id) => {
    const targetId = id || deletingExpense?.id
    if (!targetId) return
    deleteExpense(targetId)
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

  return {
    monthDate,
    dailyTotals,
    selectedDate,
    selectedExpenses,
    selectedTotal,
    categories,
    isAddOpen,
    editingExpense,
    deletingExpense,
    isDeleteOpen,
    setSelectedDate,
    setIsAddOpen,
    setIsDeleteOpen,
    changeMonth,
    openAdd,
    openEdit,
    openDelete,
    saveExpense,
    confirmDelete,
  }
}

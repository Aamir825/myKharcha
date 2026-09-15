import { useEffect, useMemo, useState } from 'react'
import { useKharchaContext } from '../context/KharchaContext'
import { getMonthId } from '../utils/formatters'

export function useExpenses() {
  const {
    expenses,
    categories,
    addExpense,
    updateExpense,
    deleteExpense,
    persistExpenses,
  } = useKharchaContext()

  const [monthDate] = useState(new Date(2026, 8, 1))
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All categories')

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [deletingExpense, setDeletingExpense] = useState(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const monthId = getMonthId(monthDate)

  const monthExpenses = useMemo(
    () => expenses.filter((e) => e.date.startsWith(monthId)),
    [expenses, monthId]
  )

  const filteredExpenses = useMemo(
    () =>
      monthExpenses.filter((e) => {
        const matchesSearch = `${e.category} ${e.description || ''}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
        const matchesCategory =
          filterCategory === 'All categories' || e.category === filterCategory
        return matchesSearch && matchesCategory
      }),
    [monthExpenses, searchTerm, filterCategory]
  )

  const totalFiltered = useMemo(
    () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [filteredExpenses]
  )

  const openAdd = () => {
    setEditingExpense(null)
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
    const handleOpenAdd = () => {
      openAdd()
    }
    window.addEventListener('open-add-expense', handleOpenAdd)
    return () => window.removeEventListener('open-add-expense', handleOpenAdd)
  }, [])

  return {
    monthDate,
    categories,
    filteredExpenses,
    totalFiltered,
    searchTerm,
    filterCategory,
    isAddOpen,
    editingExpense,
    deletingExpense,
    isDeleteOpen,
    setSearchTerm,
    setFilterCategory,
    setIsAddOpen,
    setIsDeleteOpen,
    openAdd,
    openEdit,
    openDelete,
    saveExpense,
    confirmDelete,
    persistExpenses,
  }
}

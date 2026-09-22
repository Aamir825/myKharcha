import { useMemo, useState } from 'react'
import { categories } from '../lib/constants'
import { getMonthId } from '../utils/formatters'
import { useExpensesData } from './useExpensesData'

export function useExpenses() {
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

  const [monthDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All categories')

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

  return {
    monthDate,
    categories,
    filteredExpenses,
    totalFiltered,
    searchTerm,
    filterCategory,
    setSearchTerm,
    setFilterCategory,
    // Delegated Modal State & Actions
    isAddOpen,
    editingExpense,
    deletingExpense,
    isDeleteOpen,
    defaultDate,
    setIsAddOpen,
    setIsDeleteOpen,
    openAdd,
    openEdit,
    openDelete,
    saveExpense,
    confirmDelete,
  }
}

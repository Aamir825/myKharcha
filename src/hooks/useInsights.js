import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { categories } from '../lib/constants'
import { getMonthId } from '../utils/formatters'
import { useBudget } from './useBudget'
import { useExpensesData } from './useExpensesData'

export function useInsights() {
  const isHistory = useLocation().pathname === '/history'
  const { expenses } = useExpensesData()
  const { budget } = useBudget()

  const now = new Date()
  const currentMonthDate = useMemo(
    () => new Date(now.getFullYear(), now.getMonth(), 1),
    []
  )
  const currentMonthId = getMonthId(currentMonthDate)

  const monthExpenses = useMemo(
    () => expenses.filter((e) => e.date.startsWith(currentMonthId)),
    [expenses, currentMonthId]
  )

  const spent = useMemo(
    () => monthExpenses.reduce((sum, e) => sum + e.amount, 0),
    [monthExpenses]
  )

  const remaining = budget - spent

  const daysInMonth = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth() + 1,
    0
  ).getDate()

  const remainingDays = Math.max(0, daysInMonth - now.getDate())

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

  const dailyTotals = useMemo(
    () =>
      Array.from({ length: daysInMonth }, (_, index) =>
        monthExpenses
          .filter((e) => Number(e.date.slice(-2)) === index + 1)
          .reduce((sum, e) => sum + e.amount, 0)
      ),
    [monthExpenses, daysInMonth]
  )

  const largest = categoryTotals[0]
  const activeDays = dailyTotals.filter(Boolean).length
  const highest = Math.max(...dailyTotals, 0)
  const highestDay = Math.max(0, dailyTotals.indexOf(highest)) + 1

  // Dynamic previous 4 months
  const monthNames = useMemo(() => {
    const names = []
    for (let i = 3; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      names.push(d.toLocaleDateString('en-US', { month: 'long' }))
    }
    return names
  }, [])

  const historyValues = [88500, 91200, 82450, spent]

  return {
    isHistory,
    spent,
    budget,
    remaining,
    remainingDays,
    categoryTotals,
    largest,
    dailyTotals,
    activeDays,
    highest,
    highestDay,
    monthNames,
    historyValues,
  }
}

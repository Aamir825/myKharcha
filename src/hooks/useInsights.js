import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useKharchaContext } from '../context/KharchaContext'
import { getMonthId } from '../utils/formatters'

export function useInsights() {
  const isHistory = useLocation().pathname === '/history'
  const { expenses, categories, budget } = useKharchaContext()

  const currentMonthDate = useMemo(() => new Date(2026, 8, 1), [])
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

  const remainingDays = Math.max(0, daysInMonth - new Date().getDate())

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
  const monthNames = ['June', 'July', 'August', 'September']
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

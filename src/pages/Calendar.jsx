import { CalendarDays, ChevronLeft, ChevronRight, Plus, WalletCards } from 'lucide-react'
import Header from '../components/Header'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { Input } from '@/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog'
import { money, useMyKharcha } from '../hooks/useMyKharcha'

export default function Calendar() {
  const {
    monthDate,
    dailyTotals,
    selectedDate,
    selectedExpenses,
    selectedTotal,
    setSelectedDate,
    openAdd,
    changeMonth,
    categories,
    isAddOpen,
    setIsAddOpen,
    form,
    setForm,
    addExpense,
  } = useMyKharcha()

  const days = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0
  ).getDate()

  return (
    <Header
      title="Calendar"
      description="See the rhythm of your household spending day by day."
      action={
        <Button
          onClick={() => openAdd(selectedDate)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20"
        >
          <Plus size={18} className="mr-1.5" />
          Add expense
        </Button>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        {/* Calendar Grid Card */}
        <Card className="min-h-[480px] p-6 bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Month activity
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">
                {monthDate.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day} className="py-1">
                {day}
              </span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {Array.from({ length: days }, (_, index) => {
              const date = `${monthDate.getFullYear()}-${String(
                monthDate.getMonth() + 1
              ).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`
              const total = dailyTotals[index] || 0
              const isSelected = selectedDate === date

              return (
                <button
                  type="button"
                  className={`grid min-h-14 place-content-center gap-1 rounded-xl border transition-all p-1.5 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                      : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setSelectedDate(date)}
                  key={date}
                >
                  <span className="text-xs font-bold">{index + 1}</span>
                  {total > 0 && (
                    <small
                      className={`text-[10px] font-semibold truncate ${
                        isSelected ? 'text-indigo-100' : 'text-orange-500'
                      }`}
                    >
                      {total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total}
                    </small>
                  )}
                </button>
              )
            })}
          </div>
        </Card>

        {/* Selected Day Details Card */}
        <Card className="p-6 bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80 flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Selected Day · {selectedDate}
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {money(selectedTotal)}
          </h2>

          <div className="mt-6 flex-1 space-y-3">
            {selectedExpenses.length ? (
              selectedExpenses.map((expense) => (
                <div
                  className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-0 dark:border-slate-800/60"
                  key={expense.id}
                >
                  <div className="grid size-9 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 shrink-0">
                    <WalletCards size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <strong className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {expense.category}
                    </strong>
                    <span className="mt-0.5 block truncate text-[11px] text-slate-400">
                      {expense.description || 'No description'}
                    </span>
                  </div>
                  <b className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {money(expense.amount)}
                  </b>
                </div>
              ))
            ) : (
              <div className="grid place-items-center py-16 text-xs text-slate-500 gap-2">
                <CalendarDays size={24} className="text-slate-300" />
                <span>No expenses recorded for this day</span>
              </div>
            )}
          </div>

          <Button
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => openAdd(selectedDate)}
          >
            <Plus size={17} className="mr-1.5" />
            Add expense for {selectedDate}
          </Button>
        </Card>
      </section>

      {/* Add Expense Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={addExpense} className="space-y-4">
            <DialogHeader>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                New activity
              </p>
              <DialogTitle className="mt-1 font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                Add an expense
              </DialogTitle>
              <DialogDescription>
                Record your daily purchase to keep household accounts accurate.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 py-2">
              <label className="grid gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Date
                <Input
                  type="date"
                  value={form.date}
                  onChange={(event) => setForm({ ...form, date: event.target.value })}
                  required
                />
              </label>

              <label className="grid gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Category
                <Select
                  value={form.category}
                  onValueChange={(val) => setForm({ ...form, category: val })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>

              <label className="grid gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Amount (PKR)
                <Input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={form.amount}
                  onChange={(event) => setForm({ ...form, amount: event.target.value })}
                  required
                  autoFocus
                />
              </label>

              <label className="grid gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Description (optional)
                <Input
                  placeholder="e.g. Vegetables, Groceries, Fuel"
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                />
              </label>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus size={16} className="mr-1" /> Save expense
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Header>
  )
}

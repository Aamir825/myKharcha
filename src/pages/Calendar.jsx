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
          className="bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-amber-400/30 shadow-md shadow-emerald-950/20 font-semibold"
        >
          <Plus size={18} className="mr-1.5 text-amber-300" />
          Add expense
        </Button>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        {/* Calendar Grid Card */}
        <Card className="min-h-[480px] p-6 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-950/10 dark:border-emerald-900/30">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800/60 dark:text-amber-400/60">
                Month activity
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-emerald-950 dark:text-amber-100">
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
                className="border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200"
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
                className="border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-emerald-800/60 dark:text-amber-400/60">
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
                      ? 'border-amber-400/60 bg-emerald-900 text-amber-200 shadow-lg shadow-emerald-950/25 font-bold'
                      : 'border-emerald-950/10 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-[#071711] text-emerald-950 dark:text-emerald-200/80 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/70'
                  }`}
                  onClick={() => setSelectedDate(date)}
                  key={date}
                >
                  <span className="text-xs font-bold">{index + 1}</span>
                  {total > 0 && (
                    <small
                      className={`text-[10px] font-bold truncate ${
                        isSelected ? 'text-amber-300' : 'text-amber-600 dark:text-amber-400'
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
        <Card className="p-6 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30 flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800/60 dark:text-amber-400/60">
            Selected Day · {selectedDate}
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-emerald-950 dark:text-amber-100">
            {money(selectedTotal)}
          </h2>

          <div className="mt-6 flex-1 space-y-3">
            {selectedExpenses.length ? (
              selectedExpenses.map((expense) => (
                <div
                  className="flex items-center gap-3 border-b border-emerald-950/10 py-3 last:border-0 dark:border-emerald-900/30"
                  key={expense.id}
                >
                  <div className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-amber-300 shrink-0 border border-emerald-900/10 dark:border-emerald-800/30">
                    <WalletCards size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <strong className="block text-xs font-semibold text-emerald-950 dark:text-amber-100">
                      {expense.category}
                    </strong>
                    <span className="mt-0.5 block truncate text-[11px] text-slate-400 dark:text-emerald-300/50">
                      {expense.description || 'No description'}
                    </span>
                  </div>
                  <b className="text-xs font-bold text-emerald-950 dark:text-amber-200">
                    {money(expense.amount)}
                  </b>
                </div>
              ))
            ) : (
              <div className="grid place-items-center py-16 text-xs text-emerald-800/60 dark:text-emerald-300/60 gap-2">
                <CalendarDays size={24} className="text-emerald-700/40 dark:text-amber-400/40" />
                <span>No expenses recorded for this day</span>
              </div>
            )}
          </div>

          <Button
            className="mt-6 w-full bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-amber-400/30 font-semibold"
            onClick={() => openAdd(selectedDate)}
          >
            <Plus size={17} className="mr-1.5 text-amber-300" />
            Add expense for {selectedDate}
          </Button>
        </Card>
      </section>

      {/* Add Expense Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-md border-emerald-950/20 dark:border-emerald-800/40 dark:bg-[#0c241b]">
          <form onSubmit={addExpense} className="space-y-4">
            <DialogHeader>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800/60 dark:text-amber-400/60">
                New activity
              </p>
              <DialogTitle className="mt-1 font-display text-2xl font-extrabold text-emerald-950 dark:text-amber-100">
                Add an expense
              </DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-emerald-200/70">
                Record your daily purchase to keep household accounts accurate.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 py-2">
              <label className="grid gap-1.5 text-xs font-semibold text-emerald-950 dark:text-emerald-100">
                Date
                <Input
                  type="date"
                  value={form.date}
                  onChange={(event) => setForm({ ...form, date: event.target.value })}
                  className="bg-white dark:bg-[#071711] border-emerald-950/20 dark:border-emerald-800/40"
                  required
                />
              </label>

              <label className="grid gap-1.5 text-xs font-semibold text-emerald-950 dark:text-emerald-100">
                Category
                <Select
                  value={form.category}
                  onValueChange={(val) => setForm({ ...form, category: val })}
                >
                  <SelectTrigger className="w-full bg-white dark:bg-[#071711] border-emerald-950/20 dark:border-emerald-800/40">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#0c241b] border-emerald-900/30">
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>

              <label className="grid gap-1.5 text-xs font-semibold text-emerald-950 dark:text-emerald-100">
                Amount (PKR)
                <Input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={form.amount}
                  onChange={(event) => setForm({ ...form, amount: event.target.value })}
                  className="bg-white dark:bg-[#071711] border-emerald-950/20 dark:border-emerald-800/40 font-bold"
                  required
                  autoFocus
                />
              </label>

              <label className="grid gap-1.5 text-xs font-semibold text-emerald-950 dark:text-emerald-100">
                Description (optional)
                <Input
                  placeholder="e.g. Vegetables, Groceries, Fuel"
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  className="bg-white dark:bg-[#071711] border-emerald-950/20 dark:border-emerald-800/40"
                />
              </label>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(false)}
                className="border-emerald-900/20 dark:border-emerald-800/40"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-amber-400/30 font-semibold">
                <Plus size={16} className="mr-1 text-amber-300" /> Save expense
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Header>
  )
}

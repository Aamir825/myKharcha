import { ArrowDownRight, CalendarDays, ChevronLeft, ChevronRight, Ellipsis, Plus, Search, Trash2, WalletCards } from 'lucide-react'
import { money, useMyKharcha } from '../hooks/useMyKharcha'
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

const monthLabel = (date) =>
  date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
const dateLabel = (date) =>
  date === '2026-09-14' ? 'Today · September 14' : date
const labelClass = 'text-[10px] font-bold uppercase tracking-widest text-slate-400'

export default function Dashboard() {
  const {
    monthDate,
    selectedDate,
    selectedExpenses,
    selectedTotal,
    dailyTotals,
    maxDaily,
    categoryTotals,
    categories,
    budget,
    spent,
    remaining,
    percent,
    remainingDays,
    dailySafeSpend,
    isAddOpen,
    form,
    setForm,
    setSelectedDate,
    setIsAddOpen,
    changeMonth,
    openAdd,
    addExpense,
    deleteExpense,
  } = useMyKharcha()

  return (
    <div className="mx-auto max-w-[1320px] space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className={labelClass}>Monday, 14 September</p>
          <h1 className="mt-1.5 font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            Good morning, Amna <span className="text-yellow-500">✦</span>
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Here’s how your household is doing this month.
          </p>
        </div>
        <Button onClick={() => openAdd()} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20">
          <Plus size={18} className="mr-1.5" />
          Add expense
        </Button>
      </div>

      {/* Month Selector Bar */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </Button>
        <strong className="min-w-32 text-center font-display text-sm text-slate-800 dark:text-slate-200">
          {monthLabel(monthDate)}
        </strong>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </Button>
        <Button variant="outline" size="sm" className="ml-1 text-xs">
          Today
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden border-0 bg-indigo-600 p-5 text-white shadow-lg shadow-indigo-600/25 md:col-span-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-100">
                Monthly budget
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
                {money(budget)}
              </h2>
            </div>
            <div className="grid size-10 place-items-center rounded-xl bg-white/15">
              <WalletCards size={20} />
            </div>
          </div>
          <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/20">
            <span
              className="block h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-2.5 flex justify-between text-[11px] text-indigo-100">
            <span>
              <b className="text-white font-semibold">{money(spent)}</b> spent
            </span>
            <span>{percent}% used</span>
          </div>
        </Card>

        <Metric title="Remaining" value={money(Math.max(remaining, 0))}>
          <ArrowDownRight size={15} className={remaining >= 0 ? 'text-emerald-500' : 'text-rose-500'} />
          <span>{remaining >= 0 ? 'On track this month' : 'Over budget'}</span>
        </Metric>

        <Metric title="Safe daily spend" value={money(dailySafeSpend)}>
          <CalendarDays size={15} className="text-indigo-500" />
          <span>{remainingDays} days remaining</span>
        </Metric>
      </section>

      {/* Charts & Breakdown Row */}
      <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
        <Card className="p-5">
          <PanelHeading label="Spending rhythm" title="Where your money goes">
            <Button variant="outline" size="sm" className="text-xs">
              This month <ChevronRight size={14} className="ml-1" />
            </Button>
          </PanelHeading>
          <div className="mt-6 flex h-52 gap-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col justify-between pb-5 text-[9px] text-slate-400">
              <span>20k</span>
              <span>10k</span>
              <span>0</span>
            </div>
            <div className="flex flex-1 items-end justify-between gap-1 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_67px,rgba(0,0,0,0.03)_68px)] px-1">
              {dailyTotals.map((total, index) => (
                <div
                  className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                  key={index}
                >
                  <div
                    className={`min-h-1 w-1.5 rounded-t transition-all ${
                      total ? 'bg-orange-500' : 'bg-slate-100 dark:bg-slate-800'
                    } sm:w-3`}
                    style={{ height: `${Math.max(3, (total / maxDaily) * 100)}%` }}
                    title={`${index + 1} Sep · ${money(total)}`}
                  />
                  {[0, 6, 13, 20, 27, 29].includes(index) && (
                    <span className="text-[9px] text-slate-400">{index + 1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex justify-between text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block size-2 rounded-full bg-orange-500" />
              Daily spending
            </span>
            <span>
              Average{' '}
              <b className="text-slate-900 font-semibold dark:text-slate-100">
                {money(spent / Math.max(dailyTotals.filter(Boolean).length, 1))}
              </b>
            </span>
          </div>
        </Card>

        <Card className="p-5">
          <PanelHeading label="By category" title="Biggest buckets">
            <Button variant="ghost" size="icon-sm">
              <Ellipsis size={18} />
            </Button>
          </PanelHeading>
          <div className="mt-6 space-y-4">
            {categoryTotals.map((category) => (
              <div className="flex items-center gap-3" key={category.name}>
                <div className="grid size-9 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 shrink-0">
                  <WalletCards size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3 text-xs">
                    <span className="truncate font-medium text-slate-600 dark:text-slate-300">
                      {category.name}
                    </span>
                    <b className="font-semibold text-slate-900 dark:text-slate-100">
                      {money(category.total)}
                    </b>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <span
                      className="block h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(8, (category.total / Math.max(spent, 1)) * 100)}%`,
                        background: category.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity & Selected Day Expenses Row */}
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <Card className="p-5">
          <PanelHeading label="Activity" title="September calendar">
            <Button variant="outline" size="sm" className="text-xs">
              Open calendar <ChevronRight size={14} className="ml-1" />
            </Button>
          </PanelHeading>
          <CalendarGrid
            dailyTotals={dailyTotals}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Card>

        <Card className="p-5">
          <PanelHeading label={dateLabel(selectedDate)} title={money(selectedTotal)}>
            <Button variant="ghost" size="icon-sm">
              <Search size={18} />
            </Button>
          </PanelHeading>
          <div className="mt-4 space-y-1">
            {selectedExpenses.length ? (
              selectedExpenses.map((expense) => (
                <ExpenseRow
                  expense={expense}
                  deleteExpense={deleteExpense}
                  key={expense.id}
                />
              ))
            ) : (
              <div className="grid place-items-center gap-2 py-10 text-xs text-slate-500">
                <CalendarDays size={22} className="text-slate-400" />
                <span>No expenses on this day</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-indigo-600 dark:text-indigo-400"
                  onClick={() => openAdd(selectedDate)}
                >
                  Add one
                </Button>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className="mt-4 w-full justify-start text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950"
            onClick={() => openAdd(selectedDate)}
          >
            <Plus size={16} className="mr-1.5" />
            Add expense for this day
          </Button>
        </Card>
      </div>

      {/* Floating Mobile Add Button */}
      <Button
        className="fixed bottom-20 right-5 z-20 size-12 rounded-full bg-orange-500 p-0 text-white shadow-lg shadow-orange-500/40 md:hidden hover:bg-orange-600"
        onClick={() => openAdd()}
        size="icon"
      >
        <Plus size={24} />
      </Button>

      {/* Add Expense Shadcn Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={addExpense} className="space-y-4">
            <DialogHeader>
              <p className={labelClass}>New activity</p>
              <DialogTitle className="mt-1 font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                Add an expense
              </DialogTitle>
              <DialogDescription>
                Record your daily purchase to keep household accounts accurate.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 py-2">
              <Field label="Date">
                <Input
                  type="date"
                  value={form.date}
                  onChange={(event) => setForm({ ...form, date: event.target.value })}
                  required
                />
              </Field>

              <Field label="Category">
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
              </Field>

              <Field label="Amount (PKR)">
                <Input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={form.amount}
                  onChange={(event) => setForm({ ...form, amount: event.target.value })}
                  required
                  autoFocus
                />
              </Field>

              <Field label="Description (optional)">
                <Input
                  placeholder="e.g. Vegetables, Groceries, Fuel"
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                />
              </Field>
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
    </div>
  )
}

function Metric({ title, value, children }) {
  return (
    <Card className="p-5">
      <p className={labelClass}>{title}</p>
      <h2 className="mt-2.5 font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {value}
      </h2>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        {children}
      </div>
    </Card>
  )
}

function PanelHeading({ label, title, children }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className={labelClass}>{label}</p>
        <h3 className="mt-1 font-display text-base font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}

function CalendarGrid({ dailyTotals, selectedDate, setSelectedDate }) {
  return (
    <>
      <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {Array.from({ length: 30 }, (_, index) => {
          const date = `2026-09-${String(index + 1).padStart(2, '0')}`
          const total = dailyTotals[index]
          const isSelected = selectedDate === date
          return (
            <button
              className={`grid min-h-11 place-content-center gap-0.5 rounded-lg border border-transparent text-[11px] font-medium transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
              onClick={() => setSelectedDate(date)}
              key={date}
            >
              <span>{index + 1}</span>
              {total > 0 && (
                <small
                  className={
                    isSelected ? 'text-indigo-100 font-semibold' : 'text-orange-500 font-semibold'
                  }
                >
                  {total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total}
                </small>
              )}
            </button>
          )
        })}
      </div>
    </>
  )
}

function ExpenseRow({ expense, deleteExpense }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-0 dark:border-slate-800/60">
      <div className="grid size-9 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 shrink-0">
        <WalletCards size={17} />
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
      <Button
        variant="ghost"
        size="icon-xs"
        className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
        onClick={() => deleteExpense(expense.id)}
        aria-label="Delete expense"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
      {label}
      {children}
    </label>
  )
}

import { ArrowDownRight, CalendarDays, ChevronLeft, ChevronRight, Ellipsis, Pencil, Plus, Search, Trash2, WalletCards } from 'lucide-react'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import ExpenseDialog from '../components/ExpenseDialog'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import { useDashboard } from '../hooks/useDashboard'
import { money } from '../utils/formatters'

const monthLabel = (date) =>
  date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
const dateLabel = (date) =>
  date === '2026-09-14' ? 'Today · September 14' : date
const labelClass = 'text-[10px] font-bold uppercase tracking-widest text-emerald-800/60 dark:text-amber-400/60'

export default function Dashboard() {
  const {
    user,
    displayName,
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
    editingExpense,
    deletingExpense,
    isDeleteOpen,
    setSelectedDate,
    setIsAddOpen,
    setIsDeleteOpen,
    changeMonth,
    goToToday,
    openAdd,
    openEdit,
    openDelete,
    saveExpense,
    confirmDelete,
  } = useDashboard()



  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className={labelClass}>Monday, 14 September</p>
          <h1 className="mt-1.5 font-display text-3xl font-extrabold tracking-tight text-emerald-950 md:text-4xl dark:text-amber-100">
            Good morning, {displayName} <span className="text-amber-400">✦</span>
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-emerald-200/70">
            Here’s how your household is doing this month.
          </p>
        </div>
        <Button
          onClick={() => openAdd(selectedDate)}
          className="h-11 px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-amber-400/30 shadow-md shadow-emerald-950/20 font-semibold rounded-xl text-sm transition-all hover:scale-[1.02]"
        >
          <Plus size={19} className="mr-1.5 text-amber-300" />
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
          className="border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200 hover:bg-emerald-50 dark:hover:bg-emerald-950"
        >
          <ChevronLeft size={16} />
        </Button>
        <strong className="min-w-32 text-center font-display text-sm text-emerald-950 dark:text-amber-100">
          {monthLabel(monthDate)}
        </strong>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
          className="border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200 hover:bg-emerald-50 dark:hover:bg-emerald-950"
        >
          <ChevronRight size={16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
          className="ml-1 text-xs border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200 hover:bg-emerald-50 dark:hover:bg-emerald-950"
        >
          Today
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Luxury Emerald & Gold Budget Hero Card */}
        <Card className="overflow-hidden border border-amber-500/30 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 p-5 text-white shadow-xl shadow-emerald-950/25 md:col-span-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300/80">
                Monthly budget
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-amber-100">
                {money(budget)}
              </h2>
            </div>
            <div className="grid size-10 place-items-center rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300">
              <WalletCards size={20} />
            </div>
          </div>
          <div className="mt-7 h-2 overflow-hidden rounded-full bg-emerald-950/60 border border-emerald-800/60">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 transition-all duration-500 shadow-sm"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-2.5 flex justify-between text-[11px] text-amber-200/80">
            <span>
              <b className="text-white font-semibold">{money(spent)}</b> spent
            </span>
            <span className="font-semibold text-amber-300">{percent}% used</span>
          </div>
        </Card>

        <Metric title="Remaining" value={money(Math.max(remaining, 0))}>
          <ArrowDownRight size={15} className={remaining >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'} />
          <span className="font-medium">{remaining >= 0 ? 'On track this month' : 'Over budget'}</span>
        </Metric>

        <Metric title="Safe daily spend" value={money(dailySafeSpend)}>
          <CalendarDays size={15} className="text-amber-600 dark:text-amber-400" />
          <span className="font-medium">{remainingDays} days remaining</span>
        </Metric>
      </section>

      {/* Charts & Breakdown Row */}
      <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
        <Card className="p-5 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
          <PanelHeading label="Spending rhythm" title="Where your money goes">
            <Button variant="outline" size="sm" className="text-xs border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200">
              This month <ChevronRight size={14} className="ml-1" />
            </Button>
          </PanelHeading>
          <div className="mt-6 flex h-52 gap-3 border-b border-emerald-950/10 dark:border-emerald-900/30">
            <div className="flex flex-col justify-between pb-5 text-[9px] text-emerald-800/50 dark:text-emerald-300/40">
              <span>20k</span>
              <span>10k</span>
              <span>0</span>
            </div>
            <div className="flex flex-1 items-end justify-between gap-1 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_67px,rgba(6,78,59,0.04)_68px)] px-1">
              {dailyTotals.map((total, index) => (
                <div
                  className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                  key={index}
                >
                  <div
                    className={`min-h-1 w-1.5 rounded-t transition-all ${total
                      ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-sm'
                      : 'bg-emerald-950/10 dark:bg-emerald-950/40'
                      } sm:w-3`}
                    style={{ height: `${Math.max(3, (total / maxDaily) * 100)}%` }}
                    title={`${index + 1} Sep · ${money(total)}`}
                  />
                  {[0, 6, 13, 20, 27, 29].includes(index) && (
                    <span className="text-[9px] text-emerald-800/60 dark:text-emerald-300/50">{index + 1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex justify-between text-[11px] text-emerald-800/70 dark:text-emerald-300/60">
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block size-2 rounded-full bg-amber-500" />
              Daily spending
            </span>
            <span>
              Average{' '}
              <b className="text-emerald-950 font-semibold dark:text-amber-200">
                {money(spent / Math.max(dailyTotals.filter(Boolean).length, 1))}
              </b>
            </span>
          </div>
        </Card>

        <Card className="p-5 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
          <PanelHeading label="By category" title="Biggest buckets">
            <Button variant="ghost" size="icon-sm" className="text-emerald-800 dark:text-amber-300">
              <Ellipsis size={18} />
            </Button>
          </PanelHeading>
          <div className="mt-6 space-y-4">
            {categoryTotals.map((category) => (
              <div className="flex items-center gap-3" key={category.name}>
                <div className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-amber-300 shrink-0 border border-emerald-900/10 dark:border-emerald-800/30">
                  <WalletCards size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3 text-xs">
                    <span className="truncate font-medium text-emerald-950 dark:text-emerald-100">
                      {category.name}
                    </span>
                    <b className="font-semibold text-emerald-950 dark:text-amber-200">
                      {money(category.total)}
                    </b>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-950/10 dark:bg-emerald-950/50">
                    <span
                      className="block h-full rounded-full transition-all duration-500 shadow-sm"
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
        <Card className="p-5 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
          <PanelHeading label="Activity" title="September calendar">
            <Button variant="outline" size="sm" className="text-xs border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200">
              Open calendar <ChevronRight size={14} className="ml-1" />
            </Button>
          </PanelHeading>
          <CalendarGrid
            dailyTotals={dailyTotals}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Card>

        <Card className="p-5 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
          <PanelHeading label={dateLabel(selectedDate)} title={money(selectedTotal)}>
            <Button variant="ghost" size="icon-sm" className="text-emerald-800 dark:text-amber-300">
              <Search size={18} />
            </Button>
          </PanelHeading>
          <div className="mt-4 space-y-1">
            {selectedExpenses.length ? (
              selectedExpenses.map((expense) => (
                <ExpenseRow
                  expense={expense}
                  onEdit={openEdit}
                  onDelete={openDelete}
                  key={expense.id}
                />
              ))
            ) : (
              <div className="grid place-items-center gap-2 py-10 text-xs text-emerald-800/60 dark:text-emerald-300/60">
                <CalendarDays size={22} className="text-emerald-700/40 dark:text-amber-400/40" />
                <span>No expenses on this day</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-emerald-800 dark:text-amber-400 font-semibold"
                  onClick={() => openAdd(selectedDate)}
                >
                  Add one
                </Button>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className="mt-4 w-full justify-start text-xs font-bold text-emerald-900 hover:text-emerald-950 hover:bg-emerald-50 dark:text-amber-300 dark:hover:bg-emerald-950/60"
            onClick={() => openAdd(selectedDate)}
          >
            <Plus size={16} className="mr-1.5 text-amber-500" />
            Add expense for this day
          </Button>
        </Card>
      </div>

      {/* Add / Edit Expense Dialog Component */}
      <ExpenseDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        expense={editingExpense}
        categories={categories}
        defaultDate={selectedDate}
        onSave={saveExpense}
      />

      {/* Delete Confirmation Dialog Component */}
      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        expense={deletingExpense}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

function Metric({ title, value, children }) {
  return (
    <Card className="p-5 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
      <p className={labelClass}>{title}</p>
      <h2 className="mt-2.5 font-display text-2xl font-extrabold tracking-tight text-emerald-950 dark:text-amber-100">
        {value}
      </h2>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-800/70 dark:text-emerald-200/70">
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
        <h3 className="mt-1 font-display text-base font-bold text-emerald-950 dark:text-amber-100">
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
      <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-emerald-800/60 dark:text-amber-400/60">
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
              className={`grid min-h-11 place-content-center gap-0.5 rounded-lg border transition-all ${isSelected
                ? 'border-amber-400/60 bg-emerald-900 text-amber-200 shadow-md shadow-emerald-950/25 font-bold'
                : 'border-transparent text-emerald-950 hover:bg-emerald-50 dark:text-emerald-200/80 dark:hover:bg-emerald-950/60'
                }`}
              onClick={() => setSelectedDate(date)}
              key={date}
            >
              <span>{index + 1}</span>
              {total > 0 && (
                <small
                  className={
                    isSelected ? 'text-amber-300 font-bold' : 'text-amber-600 dark:text-amber-400 font-bold'
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

function ExpenseRow({ expense, onEdit, onDelete }) {
  return (
    <div className="group flex items-center gap-3 border-b border-emerald-950/10 py-3 last:border-0 dark:border-emerald-900/30">
      <div className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-amber-300 shrink-0 border border-emerald-900/10 dark:border-emerald-800/30">
        <WalletCards size={17} />
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
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-emerald-900/60 dark:hover:text-amber-300 transition-colors"
          onClick={() => onEdit(expense)}
          aria-label="Edit expense"
        >
          <Pencil size={14} />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
          onClick={() => onDelete(expense)}
          aria-label="Delete expense"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  )
}

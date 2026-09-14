import { CalendarDays, Plus, Search, Trash2, WalletCards } from 'lucide-react'
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

export default function Expenses() {
  const {
    monthDate,
    filteredExpenses,
    searchTerm,
    filterCategory,
    setSearchTerm,
    setFilterCategory,
    deleteExpense,
    categories,
    isAddOpen,
    setIsAddOpen,
    openAdd,
    form,
    setForm,
    addExpense,
  } = useMyKharcha()

  const totalFiltered = filteredExpenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <Header
      title="Expenses"
      description="Every household purchase, kept simple and easy to find."
      action={
        <Button
          onClick={() => openAdd()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20"
        >
          <Plus size={18} className="mr-1.5" />
          Add expense
        </Button>
      }
    >
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search expenses..."
            />
          </div>

          <Select
            value={filterCategory}
            onValueChange={(val) => setFilterCategory(val)}
          >
            <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All categories">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900 dark:text-white">{filteredExpenses.length}</span> items ·{' '}
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{money(totalFiltered)}</span>
        </div>
      </div>

      {/* Expenses List Card */}
      <Card className="px-5 py-2 bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80">
        {filteredExpenses.length ? (
          filteredExpenses.map((expense) => (
            <div
              className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-0 dark:border-slate-800/60"
              key={expense.id}
            >
              <div className="grid size-10 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 shrink-0">
                <WalletCards size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <strong className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {expense.category}
                  </strong>
                  <span className="text-[10px] rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-500">
                    {expense.date}
                  </span>
                </div>
                <span className="mt-0.5 block truncate text-[11px] text-slate-400">
                  {expense.description || 'No description'}
                </span>
              </div>
              <b className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {money(expense.amount)}
              </b>
              <Button
                variant="ghost"
                size="icon-xs"
                className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 ml-2"
                onClick={() => deleteExpense(expense.id)}
                aria-label="Delete expense"
              >
                <Trash2 size={15} />
              </Button>
            </div>
          ))
        ) : (
          <div className="grid place-items-center gap-3 py-16 text-xs text-slate-500">
            <div className="grid size-12 place-items-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
              <CalendarDays size={24} />
            </div>
            <span>
              No matching expenses in {monthDate.toLocaleDateString('en-US', { month: 'long' })}.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openAdd()}
              className="mt-1"
            >
              <Plus size={15} className="mr-1" /> Add an expense
            </Button>
          </div>
        )}
      </Card>

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

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
          className="bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-amber-400/30 shadow-md shadow-emerald-950/20 font-semibold"
        >
          <Plus size={18} className="mr-1.5 text-amber-300" />
          Add expense
        </Button>
      }
    >
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-emerald-800/50 dark:text-emerald-300/40" />
            <Input
              className="pl-9 bg-white dark:bg-[#0a2019] border-emerald-950/15 dark:border-emerald-900/30 text-emerald-950 dark:text-amber-100 placeholder:text-emerald-800/40 dark:placeholder:text-emerald-300/30"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search expenses..."
            />
          </div>

          <Select
            value={filterCategory}
            onValueChange={(val) => setFilterCategory(val)}
          >
            <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-[#0a2019] border-emerald-950/15 dark:border-emerald-900/30 text-emerald-950 dark:text-amber-100">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#0c241b] border-emerald-900/40">
              <SelectItem value="All categories">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs text-emerald-900/70 dark:text-emerald-200/70 font-medium">
          Showing <span className="font-bold text-emerald-950 dark:text-white">{filteredExpenses.length}</span> items ·{' '}
          <span className="font-bold text-emerald-800 dark:text-amber-300">{money(totalFiltered)}</span>
        </div>
      </div>

      {/* Expenses List Card */}
      <Card className="px-5 py-2 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
        {filteredExpenses.length ? (
          filteredExpenses.map((expense) => (
            <div
              className="flex items-center gap-3 border-b border-emerald-950/10 py-4 last:border-0 dark:border-emerald-900/30"
              key={expense.id}
            >
              <div className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-amber-300 shrink-0 border border-emerald-900/10 dark:border-emerald-800/30">
                <WalletCards size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <strong className="block text-xs font-semibold text-emerald-950 dark:text-amber-100">
                    {expense.category}
                  </strong>
                  <span className="text-[10px] rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-900/10 dark:border-emerald-800/30 px-2 py-0.5 text-emerald-800/80 dark:text-amber-300/80 font-medium">
                    {expense.date}
                  </span>
                </div>
                <span className="mt-0.5 block truncate text-[11px] text-slate-400 dark:text-emerald-300/50">
                  {expense.description || 'No description'}
                </span>
              </div>
              <b className="text-sm font-bold text-emerald-950 dark:text-amber-200">
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
          <div className="grid place-items-center gap-3 py-16 text-xs text-emerald-800/60 dark:text-emerald-300/60">
            <div className="grid size-12 place-items-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700/60 dark:text-amber-400/60 border border-emerald-900/10 dark:border-emerald-800/30">
              <CalendarDays size={24} />
            </div>
            <span>
              No matching expenses in {monthDate.toLocaleDateString('en-US', { month: 'long' })}.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openAdd()}
              className="mt-1 border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200"
            >
              <Plus size={15} className="mr-1 text-amber-500" /> Add an expense
            </Button>
          </div>
        )}
      </Card>

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

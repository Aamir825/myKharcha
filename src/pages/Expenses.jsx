import { CalendarDays, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import Header from '../components/Header'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { Input } from '@/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import ExpenseDialog from '../components/ExpenseDialog'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import CategoryIcon from '../components/CategoryIcon'
import { useExpenses } from '../hooks/useExpenses'
import { money } from '../utils/formatters'

export default function Expenses() {
  const {
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
    defaultDate,
    setSearchTerm,
    setFilterCategory,
    setIsAddOpen,
    setIsDeleteOpen,
    openAdd,
    openEdit,
    openDelete,
    saveExpense,
    confirmDelete,
  } = useExpenses()

  return (
    <Header
      title="Expenses"
      description="Every household purchase, kept simple and easy to find."
      action={
        <Button
          onClick={() => openAdd()}
          className="h-11 flex w-full sm:w-auto px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-amber-400/30 shadow-md shadow-emerald-950/20 font-semibold rounded-xl text-sm transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus size={19} className="mr-1.5 text-amber-300" />
          Add expense
        </Button>
      }
    >
      {/* Search and Category Filter Toolbar - Fully Responsive */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-center max-w-2xl w-full">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-emerald-800/50 dark:text-emerald-300/40" />
            <Input
              className="h-10 pl-9 w-full bg-white dark:bg-[#0a2019] border-emerald-950/15 dark:border-emerald-900/30 text-emerald-950 dark:text-amber-100 placeholder:text-emerald-800/40 dark:placeholder:text-emerald-300/30 rounded-xl"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by category or description..."
            />
          </div>

          {/* Category Dropdown */}
          <Select
            value={filterCategory}
            onValueChange={(val) => setFilterCategory(val)}
          >
            <SelectTrigger className="h-10 w-full sm:w-52 bg-white dark:bg-[#0a2019] border-emerald-950/15 dark:border-emerald-900/30 text-emerald-950 dark:text-amber-100 rounded-xl">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="size-2.5 rounded-full shrink-0 shadow-xs"
                  style={{
                    backgroundColor:
                      filterCategory === 'All categories'
                        ? '#059669'
                        : categories.find((c) => c.name === filterCategory)?.color || '#059669',
                  }}
                />
                <span className="truncate">{filterCategory}</span>
              </div>
            </SelectTrigger>
            <SelectContent className="dark:bg-[#0c241b] border-emerald-900/40 rounded-xl shadow-2xl">
              <SelectItem value="All categories">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-emerald-600/60 dark:bg-amber-400/60 shrink-0" />
                  <span>All categories</span>
                </div>
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  <div className="flex items-center gap-2">
                    {category.color && (
                      <span
                        className="size-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: category.color }}
                      />
                    )}
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Counter & Total Badge */}
        <div className="flex items-center justify-between sm:justify-end text-xs text-emerald-900/70 dark:text-emerald-200/70 font-medium px-1">
          <span>Showing <b className="text-emerald-950 dark:text-white">{filteredExpenses.length}</b> items</span>
          <span className="sm:inline ml-2 pl-2 border-l border-emerald-900/20 dark:border-emerald-700/40 font-bold text-emerald-800 dark:text-amber-300">
            {money(totalFiltered)}
          </span>
        </div>
      </div>

      {/* Expenses List Card - Mobile-First Responsive Design */}
      <Card className="px-3.5 sm:px-5 py-2 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30 rounded-2xl">
        {filteredExpenses.length ? (
          filteredExpenses.map((expense) => (
            <div
              className="group flex items-center gap-3 sm:gap-4 border-b border-emerald-950/10 py-3.5 sm:py-4 last:border-0 dark:border-emerald-900/30 transition-colors"
              key={expense.id}
            >
              {/* Dynamic Category Icon Badge */}
              <CategoryIcon
                category={expense.category}
                size={18}
                containerClassName="size-10 sm:size-11 rounded-xl shadow-xs"
              />

              {/* Main Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <strong className="block text-xs sm:text-sm font-semibold text-emerald-950 dark:text-amber-100 truncate">
                    {expense.category}
                  </strong>
                  <span className="text-[10px] rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-900/10 dark:border-emerald-800/30 px-2 py-0.5 text-emerald-800/80 dark:text-amber-300/80 font-medium shrink-0">
                    {expense.date}
                  </span>
                </div>
                <span className="mt-0.5 block truncate text-[11px] sm:text-xs text-slate-400 dark:text-emerald-300/50">
                  {expense.description || 'No description'}
                </span>
              </div>

              {/* Amount & Actions */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <b className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-amber-200">
                  {money(expense.amount)}
                </b>

                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="size-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-emerald-900/60 dark:hover:text-amber-300 transition-colors cursor-pointer"
                    onClick={() => openEdit(expense)}
                    aria-label="Edit expense"
                  >
                    <Pencil size={15} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="size-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                    onClick={() => openDelete(expense)}
                    aria-label="Delete expense"
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="grid place-items-center gap-3 py-16 text-xs text-emerald-800/60 dark:text-emerald-300/60 text-center px-4">
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
              className="mt-1 h-10 px-4 py-2 border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200 font-semibold cursor-pointer"
            >
              <Plus size={16} className="mr-1 text-amber-500" /> Add an expense
            </Button>
          </div>
        )}
      </Card>

      {/* Expense Dialog */}
      <ExpenseDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        expense={editingExpense}
        categories={categories}
        defaultDate={defaultDate}
        onSave={saveExpense}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        expense={deletingExpense}
        onConfirm={confirmDelete}
      />
    </Header>
  )
}

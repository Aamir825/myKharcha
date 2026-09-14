import { useEffect, useState } from 'react'
import { Plus, Check, WalletCards, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Calendar } from '@/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog'

export default function ExpenseDialog({
  open,
  onOpenChange,
  expense = null,
  categories = [],
  defaultDate = '2026-09-14',
  onSave,
}) {
  const isEditing = Boolean(expense)
  const [date, setDate] = useState(defaultDate)
  const [category, setCategory] = useState(categories[0]?.name || 'Grocery')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  useEffect(() => {
    if (open) {
      if (expense) {
        setDate(expense.date || defaultDate)
        setCategory(expense.category || categories[0]?.name || 'Grocery')
        setAmount(String(expense.amount || ''))
        setDescription(expense.description || '')
      } else {
        setDate(defaultDate || new Date().toISOString().split('T')[0])
        setCategory(categories[0]?.name || 'Grocery')
        setAmount('')
        setDescription('')
      }
    }
  }, [open, expense, defaultDate, categories])

  const selectedDateObj = date ? new Date(`${date}T00:00:00`) : new Date()

  const handleSubmit = (event) => {
    event.preventDefault()
    const numAmount = Number(amount)
    if (!numAmount || numAmount <= 0) return

    onSave({
      ...(expense ? { id: expense.id } : {}),
      date,
      category,
      amount: numAmount,
      description: description.trim(),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-emerald-950/20 dark:border-emerald-800/40 dark:bg-[#0c241b] p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-emerald-900 text-amber-300 dark:bg-emerald-950 dark:text-amber-300 border border-amber-400/30">
                <WalletCards size={15} />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800/70 dark:text-amber-400/70">
                {isEditing ? 'Update Record' : 'New Transaction'}
              </p>
            </div>
            <DialogTitle className="mt-1 font-display text-2xl font-extrabold text-emerald-950 dark:text-amber-100">
              {isEditing ? 'Edit expense' : 'Add an expense'}
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-emerald-200/70">
              {isEditing
                ? 'Modify the details of this household expense below.'
                : 'Record your daily purchase to keep household accounts accurate.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2">
            <div className="grid gap-1.5 text-xs font-semibold text-emerald-950 dark:text-emerald-100">
              <span>Date</span>
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger
                  type="button"
                  className="flex h-10 w-full items-center justify-start gap-2.5 rounded-lg border border-emerald-950/20 bg-white px-3 text-left text-sm font-normal text-emerald-950 transition-colors hover:bg-emerald-50/50 dark:border-emerald-800/40 dark:bg-[#071711] dark:text-amber-100 dark:hover:bg-emerald-950/40 outline-none"
                >
                  <CalendarIcon className="size-4 text-amber-500 shrink-0" />
                  <span className="truncate">
                    {date ? format(selectedDateObj, 'PPP') : 'Pick a date'}
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-2 border-emerald-950/20 dark:border-emerald-800/40 dark:bg-[#0c241b] rounded-2xl shadow-2xl"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDateObj}
                    onSelect={(day) => {
                      if (day) {
                        setDate(format(day, 'yyyy-MM-dd'))
                        setIsDatePickerOpen(false)
                      }
                    }}
                    initialFocus
                    className="rounded-xl"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <label className="grid gap-1.5 text-xs font-semibold text-emerald-950 dark:text-emerald-100">
              Category
              <Select value={category} onValueChange={(val) => setCategory(val)}>
                <SelectTrigger className="h-10 w-full bg-white dark:bg-[#071711] border-emerald-950/20 dark:border-emerald-800/40 text-emerald-950 dark:text-amber-100">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-[#0c241b] border-emerald-900/30">
                  {categories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>
                      <div className="flex items-center gap-2">
                        {cat.color && (
                          <span
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                        )}
                        <span>{cat.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-emerald-950 dark:text-emerald-100">
              Amount (PKR)
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="h-10 bg-white dark:bg-[#071711] border-emerald-950/20 dark:border-emerald-800/40 font-bold text-emerald-950 dark:text-amber-100 placeholder:text-slate-400"
                  required
                  autoFocus={!isEditing}
                />
              </div>
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-emerald-950 dark:text-emerald-100">
              Description (optional)
              <Input
                placeholder="e.g. Vegetables, Groceries, Fuel"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="h-10 bg-white dark:bg-[#071711] border-emerald-950/20 dark:border-emerald-800/40 text-emerald-950 dark:text-amber-100 placeholder:text-slate-400 dark:placeholder:text-emerald-300/30"
              />
            </label>
          </div>

          <DialogFooter className="gap-2 pt-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 px-5 py-2.5 border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-amber-400/30 font-semibold shadow-md shadow-emerald-950/20"
            >
              {isEditing ? (
                <>
                  <Check size={17} className="mr-1.5 text-amber-300" /> Save changes
                </>
              ) : (
                <>
                  <Plus size={17} className="mr-1.5 text-amber-300" /> Save expense
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

import { AlertTriangle, Trash2 } from 'lucide-react'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog'
import { money } from '../hooks/useMyKharcha'

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  expense,
  onConfirm,
}) {
  if (!expense) return null

  const handleConfirm = () => {
    onConfirm(expense.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-emerald-950/20 dark:border-emerald-800/40 dark:bg-[#0c241b] p-6">
        <div className="space-y-4">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-500/20 shrink-0">
                <AlertTriangle size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-rose-600/80 dark:text-rose-400/80">
                  Confirm Deletion
                </p>
                <DialogTitle className="mt-0.5 font-display text-xl font-extrabold text-emerald-950 dark:text-amber-100">
                  Delete this expense?
                </DialogTitle>
              </div>
            </div>
            <DialogDescription className="mt-2 text-slate-500 dark:text-emerald-200/70 text-xs">
              Are you sure you want to delete this record? This action will immediately update your monthly total and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {/* Expense Snapshot Preview Card */}
          <div className="rounded-xl border border-emerald-950/10 dark:border-emerald-900/30 bg-emerald-50/40 dark:bg-[#071711] p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-950 dark:text-amber-100">
                  {expense.category}
                </span>
                <span className="text-[10px] rounded-full bg-emerald-100/70 dark:bg-emerald-950/80 border border-emerald-900/10 px-2 py-0.5 text-emerald-800 dark:text-amber-300 font-medium">
                  {expense.date}
                </span>
              </div>
              <strong className="text-sm font-extrabold text-rose-600 dark:text-rose-400">
                {money(expense.amount)}
              </strong>
            </div>
            {expense.description && (
              <p className="text-[11px] text-slate-500 dark:text-emerald-300/60 truncate">
                {expense.description}
              </p>
            )}
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
              type="button"
              onClick={handleConfirm}
              className="h-11 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-md shadow-rose-950/20"
            >
              <Trash2 size={16} className="mr-1.5" /> Delete expense
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

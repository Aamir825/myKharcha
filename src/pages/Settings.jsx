import { Check, Moon, Save, Sun, WalletCards } from 'lucide-react'
import { useState } from 'react'
import Header from '../components/Header'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { Input } from '@/ui/input'
import { money, useMyKharcha } from '../hooks/useMyKharcha'

export default function Settings() {
  const { budget, saveBudget, isDark, setIsDark } = useMyKharcha()
  const [value, setValue] = useState(String(budget))
  const [saved, setSaved] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    saveBudget(value)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Header
      title="Settings"
      description="Keep MyKharcha aligned with the way your household works."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Budget Setting Card */}
        <Card className="min-h-56 p-6 bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80">
          <div className="flex gap-4">
            <div className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 shrink-0">
              <WalletCards size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Default monthly budget
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Used for new monthly planning. Existing recorded expenses stay untouched.
              </p>
            </div>
          </div>

          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end"
            onSubmit={submit}
          >
            <label className="grid flex-1 gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              Budget in PKR
              <Input
                type="number"
                min="0"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                  setSaved(false)
                }}
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </label>

            <Button
              type="submit"
              className={
                saved
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }
            >
              {saved ? (
                <>
                  <Check size={16} className="mr-1.5" /> Saved!
                </>
              ) : (
                <>
                  <Save size={16} className="mr-1.5" /> Save budget
                </>
              )}
            </Button>
          </form>

          <span className="mt-4 block text-xs font-medium text-slate-500 dark:text-slate-400">
            Current active default:{' '}
            <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
              {money(budget)}
            </strong>
          </span>
        </Card>

        {/* Appearance Setting Card */}
        <Card className="min-h-56 p-6 bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80">
          <div className="flex gap-4">
            <div className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 shrink-0">
              <Sun size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Appearance
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Choose the visual theme you prefer while managing your monthly household money.
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              variant={!isDark ? 'default' : 'outline'}
              className={
                !isDark
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'border-slate-200 dark:border-slate-800'
              }
              onClick={() => setIsDark(false)}
            >
              <Sun size={17} className="mr-1.5" />
              Light theme
            </Button>

            <Button
              variant={isDark ? 'default' : 'outline'}
              className={
                isDark
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'border-slate-200 dark:border-slate-800'
              }
              onClick={() => setIsDark(true)}
            >
              <Moon size={17} className="mr-1.5" />
              Dark theme
            </Button>
          </div>
        </Card>
      </div>
    </Header>
  )
}

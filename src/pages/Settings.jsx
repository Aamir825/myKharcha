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
        <Card className="min-h-56 p-6 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
          <div className="flex gap-4">
            <div className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-amber-300 shrink-0 border border-emerald-900/10 dark:border-emerald-800/30">
              <WalletCards size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-emerald-950 dark:text-amber-100">
                Default monthly budget
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-emerald-200/70">
                Used for new monthly planning. Existing recorded expenses stay untouched.
              </p>
            </div>
          </div>

          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end"
            onSubmit={submit}
          >
            <label className="grid flex-1 gap-1.5 text-xs font-semibold text-emerald-950 dark:text-emerald-100">
              Budget in PKR
              <Input
                type="number"
                min="0"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                  setSaved(false)
                }}
                className="bg-white dark:bg-[#071711] border-emerald-950/20 dark:border-emerald-800/40 text-emerald-950 dark:text-amber-100 font-bold"
              />
            </label>

            <Button
              type="submit"
              className={
                saved
                  ? 'bg-emerald-700 hover:bg-emerald-600 text-white font-semibold'
                  : 'bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-amber-400/30 font-semibold shadow-md shadow-emerald-950/20'
              }
            >
              {saved ? (
                <>
                  <Check size={16} className="mr-1.5 text-amber-300" /> Saved!
                </>
              ) : (
                <>
                  <Save size={16} className="mr-1.5 text-amber-300" /> Save budget
                </>
              )}
            </Button>
          </form>

          <span className="mt-4 block text-xs font-medium text-emerald-800/80 dark:text-emerald-300/70">
            Current active default:{' '}
            <strong className="text-amber-600 dark:text-amber-300 font-bold">
              {money(budget)}
            </strong>
          </span>
        </Card>

        {/* Appearance Setting Card */}
        <Card className="min-h-56 p-6 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
          <div className="flex gap-4">
            <div className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-amber-300 shrink-0 border border-emerald-900/10 dark:border-emerald-800/30">
              <Sun size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-emerald-950 dark:text-amber-100">
                Appearance
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-emerald-200/70">
                Choose the visual tone you prefer while managing your monthly household money.
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              variant={!isDark ? 'default' : 'outline'}
              className={
                !isDark
                  ? 'bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-amber-400/30 font-semibold'
                  : 'border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200'
              }
              onClick={() => setIsDark(false)}
            >
              <Sun size={17} className="mr-1.5 text-amber-500" />
              Light theme
            </Button>

            <Button
              variant={isDark ? 'default' : 'outline'}
              className={
                isDark
                  ? 'bg-emerald-900 hover:bg-emerald-800 text-amber-200 border border-amber-400/30 font-semibold'
                  : 'border-emerald-900/20 dark:border-emerald-800/40 text-emerald-900 dark:text-amber-200'
              }
              onClick={() => setIsDark(true)}
            >
              <Moon size={17} className="mr-1.5 text-amber-300" />
              Dark theme
            </Button>
          </div>
        </Card>
      </div>
    </Header>
  )
}

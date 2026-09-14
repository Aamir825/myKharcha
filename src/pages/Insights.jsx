import { BarChart3, TrendingUp, WalletCards } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { Card } from '@/ui/card'
import { money, useMyKharcha } from '../hooks/useMyKharcha'

export default function Insights() {
  const isHistory = useLocation().pathname === '/history'
  const { categoryTotals, dailyTotals, spent, budget, remaining, remainingDays } =
    useMyKharcha()

  const largest = categoryTotals[0]
  const activeDays = dailyTotals.filter(Boolean).length
  const highest = Math.max(...dailyTotals, 0)
  const highestDay = Math.max(0, dailyTotals.indexOf(highest)) + 1
  const monthNames = ['June', 'July', 'August', 'September']
  const historyValues = [88500, 91200, 82450, spent]

  return (
    <Header
      title={isHistory ? 'History' : 'Summary'}
      description={
        isHistory
          ? 'A calmer view of how your household spending changes over time.'
          : 'The story behind this month’s household spending.'
      }
    >
      {/* Top Stat Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Stat title="Monthly Budget" value={money(budget)} subtitle="Target ceiling" />
        <Stat title="Total Spent" value={money(spent)} subtitle="Tracked so far" />
        <Stat
          title="Remaining Budget"
          value={money(Math.max(remaining, 0))}
          subtitle={`${Math.max(0, remainingDays)} days left`}
          highlight={remaining < 0}
        />
      </div>

      {isHistory ? (
        /* History 4-Month Trend View */
        <Card className="p-6 bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Monthly spending
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">
                Four month trend
              </h3>
            </div>
            <TrendingUp size={20} className="text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="mt-10 flex h-64 items-end justify-around gap-6 border-b border-slate-100 dark:border-slate-800/80 px-4 pb-2">
            {historyValues.map((value, index) => (
              <div
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                key={monthNames[index]}
              >
                <div
                  className={`relative w-full max-w-16 rounded-t-xl transition-all duration-500 flex justify-center ${
                    index === 3
                      ? 'bg-orange-500 shadow-md shadow-orange-500/25'
                      : 'bg-indigo-500 dark:bg-indigo-600'
                  }`}
                  style={{ height: `${Math.max(20, (value / 120000) * 100)}%` }}
                >
                  <span className="absolute -top-7 whitespace-nowrap text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {money(value)}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {monthNames[index]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        /* Summary Breakdown Grid */
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card className="p-6 bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Distribution
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">
                  Spending by category
                </h3>
              </div>
              <BarChart3 size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>

            <div className="mt-6 space-y-4">
              {categoryTotals.map((category) => (
                <div key={category.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-600 dark:text-slate-300">
                      {category.name}
                    </span>
                    <b className="font-semibold text-slate-900 dark:text-white">
                      {money(category.total)}
                    </b>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <span
                      className="block h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(5, (category.total / Math.max(spent, 1)) * 100)}%`,
                        background: category.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Monthly statistics
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">
                  Key signals
                </h3>
              </div>
              <WalletCards size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>

            <div className="mt-4 divide-y divide-slate-100 text-xs dark:divide-slate-800/60">
              {[
                [
                  'Average spend on active day',
                  money(spent / Math.max(activeDays, 1)),
                ],
                [
                  'Highest spending day',
                  `September ${highestDay} · ${money(highest)}`,
                ],
                ['Largest category bucket', largest?.name || 'No data'],
                [
                  'Safe daily spend',
                  money(Math.max(remaining, 0) / Math.max(remainingDays, 1)),
                ],
              ].map(([label, value]) => (
                <div
                  className="flex justify-between items-center gap-3 py-3.5 text-slate-500 dark:text-slate-400"
                  key={label}
                >
                  <span>{label}</span>
                  <b className="text-right font-semibold text-slate-900 dark:text-slate-100">
                    {value}
                  </b>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </Header>
  )
}

function Stat({ title, value, subtitle, highlight }) {
  return (
    <Card className="p-5 bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {title}
      </p>
      <h2
        className={`mt-2 font-display text-2xl font-extrabold tracking-tight ${
          highlight
            ? 'text-rose-600 dark:text-rose-400'
            : 'text-slate-900 dark:text-white'
        }`}
      >
        {value}
      </h2>
      {subtitle && (
        <span className="mt-2 block text-xs text-slate-400">{subtitle}</span>
      )}
    </Card>
  )
}

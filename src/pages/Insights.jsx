import { BarChart3, TrendingUp, WalletCards } from 'lucide-react'
import Header from '../components/Header'
import { Card } from '@/ui/card'
import { useInsights } from '../hooks/useInsights'
import { money } from '../utils/formatters'

export default function Insights() {
  const {
    isHistory,
    spent,
    budget,
    remaining,
    remainingDays,
    categoryTotals,
    largest,
    dailyTotals,
    activeDays,
    highest,
    highestDay,
    monthNames,
    historyValues,
  } = useInsights()

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
        <Card className="p-6 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-950/10 dark:border-emerald-900/30">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800/60 dark:text-amber-400/60">
                Monthly spending
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-emerald-950 dark:text-amber-100">
                Four month trend
              </h3>
            </div>
            <TrendingUp size={20} className="text-amber-600 dark:text-amber-400" />
          </div>

          <div className="mt-10 flex h-64 items-end justify-around gap-6 border-b border-emerald-950/10 dark:border-emerald-900/30 px-4 pb-2">
            {historyValues.map((value, index) => (
              <div
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                key={monthNames[index]}
              >
                <div
                  className={`relative w-full max-w-16 rounded-t-xl transition-all duration-500 flex justify-center ${
                    index === 3
                      ? 'bg-gradient-to-t from-amber-600 via-amber-500 to-yellow-400 shadow-lg shadow-amber-500/25 border-t border-amber-300'
                      : 'bg-emerald-800 dark:bg-emerald-900'
                  }`}
                  style={{ height: `${Math.max(20, (value / 120000) * 100)}%` }}
                >
                  <span className="absolute -top-7 whitespace-nowrap text-[11px] font-bold text-emerald-950 dark:text-amber-200">
                    {money(value)}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-950/70 dark:text-emerald-200/70">
                  {monthNames[index]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        /* Summary Breakdown Grid */
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card className="p-6 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-950/10 dark:border-emerald-900/30">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800/60 dark:text-amber-400/60">
                  Distribution
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-emerald-950 dark:text-amber-100">
                  Spending by category
                </h3>
              </div>
              <BarChart3 size={20} className="text-emerald-700 dark:text-amber-400" />
            </div>

            <div className="mt-6 space-y-4">
              {categoryTotals.map((category) => (
                <div key={category.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-emerald-950 dark:text-emerald-100">
                      {category.name}
                    </span>
                    <b className="font-semibold text-emerald-950 dark:text-amber-200">
                      {money(category.total)}
                    </b>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-emerald-950/10 dark:bg-emerald-950/50">
                    <span
                      className="block h-full rounded-full transition-all duration-500 shadow-sm"
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

          <Card className="p-6 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-950/10 dark:border-emerald-900/30">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800/60 dark:text-amber-400/60">
                  Monthly statistics
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-emerald-950 dark:text-amber-100">
                  Key signals
                </h3>
              </div>
              <WalletCards size={20} className="text-emerald-700 dark:text-amber-400" />
            </div>

            <div className="mt-4 divide-y divide-emerald-950/10 text-xs dark:divide-emerald-900/30">
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
                  className="flex justify-between items-center gap-3 py-3.5 text-emerald-900/70 dark:text-emerald-200/70"
                  key={label}
                >
                  <span>{label}</span>
                  <b className="text-right font-semibold text-emerald-950 dark:text-amber-200">
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
    <Card className="p-5 bg-white dark:bg-[#0a2019] border-emerald-950/10 dark:border-emerald-900/30">
      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800/60 dark:text-amber-400/60">
        {title}
      </p>
      <h2
        className={`mt-2 font-display text-2xl font-extrabold tracking-tight ${
          highlight
            ? 'text-rose-600 dark:text-rose-400'
            : 'text-emerald-950 dark:text-amber-100'
        }`}
      >
        {value}
      </h2>
      {subtitle && (
        <span className="mt-2 block text-xs text-emerald-800/60 dark:text-emerald-300/50">{subtitle}</span>
      )}
    </Card>
  )
}

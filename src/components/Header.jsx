export default function Header({
  title,
  eyebrow = 'Household money',
  description,
  action,
  children,
}) {
  return (
    <div className="mx-auto max-w-[1320px] space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {eyebrow}
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  )
}

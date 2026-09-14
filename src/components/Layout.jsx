import { ChevronRight, Moon, Sun } from 'lucide-react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Avatar, AvatarFallback } from '@/ui/avatar'
import { Button } from '@/ui/button'
import { useMyKharcha } from '../hooks/useMyKharcha'

export default function Layout() {
  const { pathname } = useLocation()
  const { isDark, setIsDark } = useMyKharcha()

  const pageTitle =
    pathname === '/'
      ? 'Overview'
      : pathname
          .slice(1)
          .replace(/-/g, ' ')
          .replace(/^[a-z]/, (letter) => letter.toUpperCase())

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 antialiased">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Column: Fixed Top Header + Scrollable Main Content */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Fixed Top Header */}
        <header className="shrink-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur md:h-[72px] md:px-10 dark:border-slate-800/80 dark:bg-slate-950/90">
          <div className="flex items-center gap-2.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">MyKharcha</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="font-bold text-slate-900 dark:text-white">{pageTitle}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Synced status badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/50 dark:border-emerald-800/60 dark:text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Synced
            </div>

            {/* Quick theme toggle button */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsDark(!isDark)}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </Button>

            {/* User Avatar */}
            <Avatar size="sm" className="bg-orange-500 text-white font-bold">
              <AvatarFallback className="bg-orange-500 text-white text-xs font-bold">AK</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Scrollable Main Content Area */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 md:p-10 pb-24 md:pb-12 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

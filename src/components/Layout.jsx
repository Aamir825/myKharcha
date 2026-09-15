import { ChevronRight, Moon, Sun } from 'lucide-react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Avatar, AvatarFallback } from '@/ui/avatar'
import { Button } from '@/ui/button'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'

export default function Layout() {
  const { pathname } = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const { initials } = useAuth()

  const pageTitle =
    pathname === '/'
      ? 'Overview'
      : pathname
          .slice(1)
          .replace(/-/g, ' ')
          .replace(/^[a-z]/, (letter) => letter.toUpperCase())

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#f6f9f7] text-slate-900 dark:bg-[#05140f] dark:text-emerald-50 antialiased">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Column: Fixed Top Header + Scrollable Main Content */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Fixed Top Header */}
        <header className="shrink-0 z-20 flex h-16 items-center justify-between border-b border-emerald-950/10 bg-white/90 px-4 backdrop-blur md:h-[72px] md:px-10 dark:border-emerald-900/30 dark:bg-[#081b14]/90">
          <div className="flex items-center gap-2.5 text-xs font-medium text-emerald-800/70 dark:text-emerald-300/70">
            <span className="font-bold text-emerald-950 dark:text-amber-200">MyKharcha</span>
            <ChevronRight size={14} className="text-emerald-400 dark:text-emerald-600" />
            <span className="font-bold text-emerald-900 dark:text-amber-300">{pageTitle}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Synced status badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 border border-emerald-300/70 dark:bg-emerald-950/80 dark:border-emerald-700/60 dark:text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Synced
            </div>

            {/* Quick theme toggle button */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleTheme}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="text-emerald-800 hover:text-amber-600 hover:bg-emerald-50 dark:text-amber-300 dark:hover:text-amber-200 dark:hover:bg-emerald-950/70"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </Button>

            {/* User Avatar */}
            <Avatar size="sm" className="bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold ring-1 ring-amber-400/40">
              <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-700 text-white text-xs font-bold">{initials}</AvatarFallback>
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

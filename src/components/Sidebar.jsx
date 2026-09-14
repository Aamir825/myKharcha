import { ArrowUpRight, BarChart3, CalendarDays, Ellipsis, LayoutDashboard, LogOut, Moon, MoreHorizontal, Plus, Settings2, Sparkles, Sun, TrendingUp, User, WalletCards } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { Avatar, AvatarFallback } from '@/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { useMyKharcha } from '../hooks/useMyKharcha'

const desktopMenu = [
  { label: 'Home', path: '/', icon: LayoutDashboard },
  { label: 'Calendar', path: '/calendar', icon: CalendarDays },
  { label: 'Expenses', path: '/expenses', icon: BarChart3 },
  { label: 'Summary', path: '/summary', icon: TrendingUp },
  { label: 'History', path: '/history', icon: ArrowUpRight },
  { label: 'Settings', path: '/settings', icon: Settings2 },
]

export default function Sidebar() {
  const { pathname } = useLocation()
  const { isDark, setIsDark } = useMyKharcha()

  const handleQuickAdd = () => {
    window.dispatchEvent(new CustomEvent('open-add-expense'))
  }

  const isMoreActive = ['/summary', '/history', '/settings'].includes(pathname)

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-emerald-950/10 bg-white/95 px-4 py-6 md:flex dark:border-emerald-900/30 dark:bg-[#071711] select-none">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 pb-8">
          <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 border border-amber-500/30 shadow-lg shadow-emerald-950/20">
            <WalletCards size={20} className="text-amber-300" />
          </div>
          <div>
            <strong className="block font-display text-sm font-extrabold tracking-tight text-emerald-950 dark:text-amber-100">
              MyKharcha
            </strong>
            <span className="block text-[11px] font-medium text-amber-700/80 dark:text-amber-400/70">
              Household money
            </span>
          </div>
        </div>

        {/* Section label */}
        <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-emerald-800/60 dark:text-amber-400/50">
          Workspace
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {desktopMenu.map(({ label, path, icon: Icon }) => (
            <NavLink
              to={path}
              end={path === '/'}
              key={label}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-900 text-amber-300 shadow-md shadow-emerald-950/25 border-l-4 border-amber-400 font-semibold dark:bg-emerald-950/90 dark:text-amber-300'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-950 dark:text-emerald-200/70 dark:hover:bg-emerald-950/50 dark:hover:text-amber-200'
                }`
              }
            >
              <Icon size={18} className="shrink-0 transition-transform group-hover:scale-105" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User profile dropdown with Shadcn Avatar & DropdownMenu */}
        <div className="mt-auto border-t border-emerald-950/10 pt-4 dark:border-emerald-900/30">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-emerald-50 transition-colors dark:hover:bg-emerald-950/60 outline-none">
              <Avatar size="sm" className="bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold ring-1 ring-amber-400/40">
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-700 text-white text-xs font-bold">AK</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <strong className="block truncate text-xs font-bold text-emerald-950 dark:text-amber-100">
                  Amna & Khalid
                </strong>
                <span className="block truncate text-[10px] text-emerald-800/60 dark:text-amber-400/60">
                  Personal space
                </span>
              </div>
              <Ellipsis size={16} className="text-emerald-700/60 dark:text-amber-400/60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-56 border-emerald-900/20 dark:border-emerald-800/40 dark:bg-[#0c241b]">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-emerald-900 dark:text-amber-200">Household Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-emerald-100 dark:bg-emerald-900/50" />
                <DropdownMenuItem className="focus:bg-emerald-50 dark:focus:bg-emerald-900/40 focus:text-emerald-950 dark:focus:text-amber-200">
                  <User className="mr-2 size-4 text-amber-600 dark:text-amber-400" /> Profile & Members
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-emerald-50 dark:focus:bg-emerald-900/40 focus:text-emerald-950 dark:focus:text-amber-200">
                  <Sparkles className="mr-2 size-4 text-amber-600 dark:text-amber-400" /> Monthly Review
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-emerald-100 dark:bg-emerald-900/50" />
              <DropdownMenuItem variant="destructive">
                <LogOut className="mr-2 size-4" /> Switch Workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Ultra-Modern Floating Island Mobile Navigation Dock */}
      <div className="fixed bottom-4 inset-x-4 max-w-[380px] mx-auto z-40 md:hidden select-none">
        <nav className="relative flex items-center justify-between px-3.5 py-2 rounded-full bg-white/95 dark:bg-[#081f17]/95 backdrop-blur-2xl border border-emerald-950/15 dark:border-amber-500/25 shadow-[0_14px_38px_rgba(4,26,19,0.22)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.7)]">
          {/* Tab 1: Home */}
          <NavLink
            to="/"
            end
            aria-label="Home"
            className={({ isActive }) =>
              `relative flex w-11 h-11 shrink-0 aspect-square items-center justify-center rounded-full transition-all duration-200 ${
                isActive
                  ? 'text-amber-300 font-bold bg-emerald-900 dark:bg-emerald-900/90 shadow-md shadow-emerald-950/20 scale-105'
                  : 'text-slate-500 hover:text-emerald-900 dark:text-emerald-200/60 dark:hover:text-amber-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40'
              }`
            }
          >
            {({ isActive }) => (
              <LayoutDashboard size={20} className={isActive ? 'text-amber-300' : ''} />
            )}
          </NavLink>

          {/* Tab 2: Calendar */}
          <NavLink
            to="/calendar"
            aria-label="Calendar"
            className={({ isActive }) =>
              `relative flex w-11 h-11 shrink-0 aspect-square items-center justify-center rounded-full transition-all duration-200 ${
                isActive
                  ? 'text-amber-300 font-bold bg-emerald-900 dark:bg-emerald-900/90 shadow-md shadow-emerald-950/20 scale-105'
                  : 'text-slate-500 hover:text-emerald-900 dark:text-emerald-200/60 dark:hover:text-amber-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40'
              }`
            }
          >
            {({ isActive }) => (
              <CalendarDays size={20} className={isActive ? 'text-amber-300' : ''} />
            )}
          </NavLink>

          {/* Center Elevated Action Button: Quick Add Expense */}
          <div className="relative -translate-y-4 px-1 shrink-0">
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label="Quick Add Expense"
              className="group relative flex w-13 h-13 shrink-0 aspect-square items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 text-slate-950 shadow-[0_8px_20px_rgba(217,119,6,0.45)] ring-4 ring-[#f6f9f7] dark:ring-[#05140f] active:scale-90 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Plus size={26} strokeWidth={2.5} className="text-slate-950 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Tab 4: Expenses */}
          <NavLink
            to="/expenses"
            aria-label="Expenses"
            className={({ isActive }) =>
              `relative flex w-11 h-11 shrink-0 aspect-square items-center justify-center rounded-full transition-all duration-200 ${
                isActive
                  ? 'text-amber-300 font-bold bg-emerald-900 dark:bg-emerald-900/90 shadow-md shadow-emerald-950/20 scale-105'
                  : 'text-slate-500 hover:text-emerald-900 dark:text-emerald-200/60 dark:hover:text-amber-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40'
              }`
            }
          >
            {({ isActive }) => (
              <BarChart3 size={20} className={isActive ? 'text-amber-300' : ''} />
            )}
          </NavLink>

          {/* Tab 5: More (Summary, History, Settings) */}
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="More"
              className={`relative flex w-11 h-11 shrink-0 aspect-square items-center justify-center rounded-full transition-all duration-200 outline-none ${
                isMoreActive
                  ? 'text-amber-300 font-bold bg-emerald-900 dark:bg-emerald-900/90 shadow-md shadow-emerald-950/20 scale-105'
                  : 'text-slate-500 hover:text-emerald-900 dark:text-emerald-200/60 dark:hover:text-amber-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40'
              }`}
            >
              <MoreHorizontal size={20} className={isMoreActive ? 'text-amber-300' : ''} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="top"
              sideOffset={12}
              className="w-48 border-emerald-950/20 dark:border-emerald-800/40 dark:bg-[#0c241b] mb-2 p-1.5 rounded-2xl shadow-2xl"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-[11px] font-bold text-emerald-900 dark:text-amber-200">
                  Analytics & Workspace
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-emerald-100 dark:bg-emerald-900/50" />
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/summary"
                    className="flex w-full items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg text-emerald-950 dark:text-amber-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                  >
                    <TrendingUp size={16} className="text-amber-500" />
                    <span>Monthly Summary</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/history"
                    className="flex w-full items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg text-emerald-950 dark:text-amber-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                  >
                    <ArrowUpRight size={16} className="text-amber-500" />
                    <span>Spending History</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/settings"
                    className="flex w-full items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg text-emerald-950 dark:text-amber-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                  >
                    <Settings2 size={16} className="text-amber-500" />
                    <span>Settings & Budget</span>
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-emerald-100 dark:bg-emerald-900/50" />
              <DropdownMenuItem
                onClick={() => setIsDark(!isDark)}
                className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg text-emerald-950 dark:text-amber-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 cursor-pointer"
              >
                {isDark ? (
                  <>
                    <Sun size={16} className="text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={16} className="text-emerald-700" />
                    <span>Dark Mode</span>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </>
  )
}

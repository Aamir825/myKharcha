import { ArrowUpRight, BarChart3, CalendarDays, Ellipsis, LayoutDashboard, LogOut, Settings2, Sparkles, TrendingUp, User, WalletCards } from 'lucide-react'
import { NavLink } from 'react-router-dom'
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

const menu = [
  { label: 'Home', path: '/', icon: LayoutDashboard },
  { label: 'Calendar', path: '/calendar', icon: CalendarDays },
  { label: 'Expenses', path: '/expenses', icon: BarChart3 },
  { label: 'Summary', path: '/summary', icon: TrendingUp },
  { label: 'History', path: '/history', icon: ArrowUpRight },
  { label: 'Settings', path: '/settings', icon: Settings2 },
]

export default function Sidebar() {
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
          {menu.map(({ label, path, icon: Icon }) => (
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

      {/* Mobile Fixed Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-around border-t border-emerald-900/15 bg-white/95 px-2 backdrop-blur md:hidden dark:border-emerald-900/40 dark:bg-[#071711]/95">
        {menu.map(({ label, path, icon: Icon }) => (
          <NavLink
            to={path}
            end={path === '/'}
            key={label}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-emerald-800 font-bold dark:text-amber-300'
                  : 'text-slate-400 hover:text-emerald-900 dark:hover:text-amber-200'
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}

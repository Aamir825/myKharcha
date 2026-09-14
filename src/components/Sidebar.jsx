import { ArrowUpRight, BarChart3, CalendarDays, Ellipsis, LayoutDashboard, LogOut, Settings2, Sparkles, TrendingUp, User, WalletCards } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Avatar, AvatarFallback } from '@/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
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
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white px-4 py-6 md:flex dark:border-slate-800/80 dark:bg-slate-950 select-none">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 pb-8">
          <div className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25">
            <WalletCards size={20} />
          </div>
          <div>
            <strong className="block font-display text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
              MyKharcha
            </strong>
            <span className="block text-[11px] font-medium text-slate-400">
              Household money
            </span>
          </div>
        </div>

        {/* Section label */}
        <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                }`
              }
            >
              <Icon size={18} className="shrink-0 transition-transform group-hover:scale-105" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User profile dropdown with Shadcn Avatar & DropdownMenu */}
        <div className="mt-auto border-t border-slate-200/80 pt-4 dark:border-slate-800/80">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-slate-100 transition-colors dark:hover:bg-slate-900 outline-none">
              <Avatar size="sm" className="bg-orange-500 text-white font-bold">
                <AvatarFallback className="bg-orange-500 text-white text-xs font-bold">AK</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <strong className="block truncate text-xs font-bold text-slate-900 dark:text-slate-100">
                  Amna & Khalid
                </strong>
                <span className="block truncate text-[10px] text-slate-400">
                  Personal space
                </span>
              </div>
              <Ellipsis size={16} className="text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-56">
              <DropdownMenuLabel>Household Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 size-4" /> Profile & Members
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Sparkles className="mr-2 size-4" /> Monthly Review
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut className="mr-2 size-4" /> Switch Workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile Fixed Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 px-2 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95">
        {menu.map(({ label, path, icon: Icon }) => (
          <NavLink
            to={path}
            end={path === '/'}
            key={label}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-indigo-600 font-bold dark:text-indigo-400'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
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

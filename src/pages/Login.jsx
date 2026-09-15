import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  User,
  WalletCards,
  Zap,
} from 'lucide-react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: 'Amna & Khalid',
    email: 'amna.khalid@mykharcha.app',
    password: 'password123',
    rememberMe: true,
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      login({
        name: formData.name || 'Amna & Khalid',
        email: formData.email,
        isLoggedIn: true,
      })
      setIsLoading(false)
      navigate('/')
    }, 600)
  }

  const handleDemoLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      login({
        name: 'Amna & Khalid',
        email: 'amna.khalid@mykharcha.app',
        isLoggedIn: true,
      })
      setIsLoading(false)
      navigate('/')
    }, 400)
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f4f8f5] dark:bg-[#030d09] text-slate-900 dark:text-slate-100 flex flex-col justify-between select-none">
      {/* Ambient Mesh Glow Highlights */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 size-[550px] rounded-full bg-emerald-600/15 dark:bg-emerald-500/10 blur-[130px]" />
        <div className="absolute top-1/3 -right-32 size-[500px] rounded-full bg-amber-500/15 dark:bg-amber-400/10 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/4 size-[600px] rounded-full bg-emerald-900/10 dark:bg-emerald-700/10 blur-[140px]" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 border border-amber-400/40 shadow-lg shadow-emerald-950/20">
            <WalletCards size={22} className="text-amber-300" />
          </div>
          <div>
            <strong className="block font-display text-lg font-extrabold tracking-tight text-emerald-950 dark:text-amber-100">
              MyKharcha
            </strong>
            <span className="block text-xs font-medium text-amber-700 dark:text-amber-400/80">
              Household money made clear
            </span>
          </div>
        </div>

        {/* Theme switcher */}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-full border-emerald-950/15 dark:border-emerald-800/40 bg-white/80 dark:bg-[#092219]/80 backdrop-blur-md text-emerald-950 dark:text-amber-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/80"
        >
          {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-emerald-800" />}
        </Button>
      </header>

      {/* Main Content Showcase */}
      <main className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-6 py-6 lg:grid-cols-12 lg:py-10">
        {/* Left Column: Visual Brand Pitch (Hidden on small screens) */}
        <div className="hidden lg:col-span-6 lg:flex lg:flex-col lg:justify-center space-y-8 pr-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 backdrop-blur-md">
            <Sparkles size={14} className="text-amber-500" />
            <span>Modern Household Budgeting</span>
          </div>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-emerald-950 dark:text-amber-100 xl:text-5xl leading-[1.15]">
            Spend with total peace of mind, together.
          </h1>

          <p className="text-base text-slate-600 dark:text-emerald-200/75 leading-relaxed max-w-lg">
            Say goodbye to math anxiety and forgotten expenses. Track daily household spending with isolated monthly budgets, safe daily limits, and real-time clarity.
          </p>

          {/* Value Props Grid */}
          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="rounded-2xl border border-emerald-950/10 dark:border-emerald-900/40 bg-white/60 dark:bg-[#071f16]/60 backdrop-blur-md p-4 space-y-2">
              <div className="grid size-8 place-items-center rounded-lg bg-emerald-900 text-amber-300 dark:bg-emerald-950 dark:text-amber-300">
                <ShieldCheck size={18} />
              </div>
              <strong className="block text-sm font-bold text-emerald-950 dark:text-amber-100">
                Strict Month Isolation
              </strong>
              <p className="text-xs text-slate-500 dark:text-emerald-300/60 leading-relaxed">
                Modifying this month never tampers with your past archived budgets.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-950/10 dark:border-emerald-900/40 bg-white/60 dark:bg-[#071f16]/60 backdrop-blur-md p-4 space-y-2">
              <div className="grid size-8 place-items-center rounded-lg bg-amber-600/20 text-amber-600 dark:text-amber-300">
                <Zap size={18} />
              </div>
              <strong className="block text-sm font-bold text-emerald-950 dark:text-amber-100">
                Safe Daily Spend
              </strong>
              <p className="text-xs text-slate-500 dark:text-emerald-300/60 leading-relaxed">
                Know exactly what is safe to spend today without running out before the 30th.
              </p>
            </div>
          </div>

          {/* Social Proof Household Badge */}
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-950/10 dark:border-emerald-900/40 bg-white/40 dark:bg-[#051811]/40 backdrop-blur-md p-3.5">
            <div className="flex -space-x-2 overflow-hidden">
              <span className="inline-grid size-8 place-items-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 text-[11px] font-bold text-white ring-2 ring-white dark:ring-[#071711]">
                AK
              </span>
              <span className="inline-grid size-8 place-items-center rounded-full bg-gradient-to-tr from-emerald-700 to-emerald-900 text-[11px] font-bold text-amber-200 ring-2 ring-white dark:ring-[#071711]">
                MS
              </span>
            </div>
            <div className="text-xs">
              <span className="font-semibold text-emerald-950 dark:text-amber-100">
                Trusted for daily groceries & utilities
              </span>
              <span className="block text-[11px] text-emerald-800/60 dark:text-emerald-300/60">
                PKR currency native · Offline ready
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Card */}
        <div className="w-full lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-emerald-950/15 dark:border-amber-500/25 bg-white/95 dark:bg-[#081e16]/95 p-7 sm:p-9 shadow-2xl backdrop-blur-2xl">
            {/* Tab switch header */}
            <div className="flex rounded-xl bg-emerald-50/80 dark:bg-[#05150f] p-1 border border-emerald-950/10 dark:border-emerald-900/30">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                  mode === 'login'
                    ? 'bg-white dark:bg-emerald-900 text-emerald-950 dark:text-amber-200 shadow-sm'
                    : 'text-slate-500 hover:text-emerald-900 dark:text-emerald-300/60 dark:hover:text-amber-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-emerald-900 text-emerald-950 dark:text-amber-200 shadow-sm'
                    : 'text-slate-500 hover:text-emerald-900 dark:text-emerald-300/60 dark:hover:text-amber-200'
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="mt-6">
              <h2 className="font-display text-2xl font-extrabold text-emerald-950 dark:text-amber-100">
                {mode === 'login' ? 'Welcome back' : 'Start your household space'}
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-emerald-200/70">
                {mode === 'login'
                  ? 'Sign in to review your current monthly budget and expenses.'
                  : 'Set up your household tracker in under 30 seconds.'}
              </p>
            </div>

            {/* Instant Demo Access Button */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent p-3 text-left transition-all hover:border-amber-400 hover:from-amber-500/25 dark:from-amber-400/10 dark:hover:from-amber-400/20 active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-8 place-items-center rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-sm">
                    ✦
                  </div>
                  <div>
                    <strong className="block text-xs font-bold text-emerald-950 dark:text-amber-100">
                      1-Click Demo Household
                    </strong>
                    <span className="block text-[11px] text-amber-700 dark:text-amber-300/80">
                      Continue as Amna & Khalid
                    </span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-amber-600 dark:text-amber-400 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="relative my-5 text-center text-[11px] text-slate-400 dark:text-emerald-400/40">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-emerald-950/10 dark:border-emerald-900/40" />
              </div>
              <span className="relative bg-white dark:bg-[#081e16] px-3">or continue with email</span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-emerald-950 dark:text-emerald-100">
                    Household Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-emerald-400/50" />
                    <Input
                      type="text"
                      placeholder="e.g. Amna & Khalid"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-11 pl-10 bg-white dark:bg-[#061711] border-emerald-950/15 dark:border-emerald-800/40 text-emerald-950 dark:text-amber-100 font-medium"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-950 dark:text-emerald-100">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-emerald-400/50" />
                  <Input
                    type="email"
                    placeholder="you@household.app"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 pl-10 bg-white dark:bg-[#061711] border-emerald-950/15 dark:border-emerald-800/40 text-emerald-950 dark:text-amber-100 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-emerald-950 dark:text-emerald-100">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      className="text-[11px] font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-emerald-400/50" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-11 pl-10 pr-10 bg-white dark:bg-[#061711] border-emerald-950/15 dark:border-emerald-800/40 text-emerald-950 dark:text-amber-100 font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-emerald-400/50 dark:hover:text-amber-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full h-11 py-2.5 rounded-xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 dark:from-emerald-950 dark:via-emerald-900 dark:to-[#042419] text-amber-300 hover:text-amber-200 border border-amber-400/40 font-bold text-sm shadow-xl shadow-emerald-950/25 transition-all hover:scale-[1.01] active:scale-95"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-amber-300 border-t-transparent" />
                    Authenticating...
                  </span>
                ) : mode === 'login' ? (
                  'Sign in to MyKharcha'
                ) : (
                  'Create Household Space'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500 dark:text-emerald-300/60">
              {mode === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="font-bold text-emerald-950 dark:text-amber-300 hover:underline"
                  >
                    Sign up free
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="font-bold text-emerald-950 dark:text-amber-300 hover:underline"
                  >
                    Sign in here
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 py-5 text-center text-xs text-slate-500 dark:text-emerald-400/50">
        <span>© 2026 MyKharcha · Household Budget & Expense Tracker PWA</span>
      </footer>
    </div>
  )
}

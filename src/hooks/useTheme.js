import { useKharchaContext } from '../context/KharchaContext'

export function useTheme() {
  const { isDark, setIsDark } = useKharchaContext()

  const toggleTheme = () => setIsDark(!isDark)

  return {
    isDark,
    setIsDark,
    toggleTheme,
  }
}

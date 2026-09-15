import { useKharchaContext } from '../context/KharchaContext'

export function useAuth() {
  const { user, login, logout } = useKharchaContext()

  const displayName = user?.name || 'Amna & Khalid'
  const firstName = displayName.split('&')[0].trim()
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return {
    user,
    isAuthenticated: Boolean(user?.isLoggedIn),
    displayName,
    firstName,
    initials,
    login,
    logout,
  }
}

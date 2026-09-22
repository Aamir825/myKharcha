import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

const THEME_KEY = 'mykharcha-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return true
  const saved = localStorage.getItem(THEME_KEY)
  if (saved !== null) {
    return saved === 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

let isDark = getInitialTheme()
const listeners = new Set()

function notify() {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return isDark
}

function getServerSnapshot() {
  return true
}

export function useTheme() {
  const currentTheme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const setIsDark = useCallback((dark) => {
    isDark = Boolean(dark)
    notify()
  }, [])

  const toggleTheme = useCallback(() => {
    isDark = !isDark
    notify()
  }, [])

  return {
    isDark: currentTheme,
    setIsDark,
    toggleTheme,
  }
}

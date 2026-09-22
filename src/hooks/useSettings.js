import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'
import { useTheme } from './useTheme'

export function useSettings() {
  const { budget, saveBudget } = useBudget()
  const { isDark, setIsDark } = useTheme()
  const [value, setValue] = useState(String(budget))
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setValue(String(budget))
  }, [budget])

  const submit = async (event) => {
    event.preventDefault()
    await saveBudget(value)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return {
    budget,
    saveBudget,
    isDark,
    setIsDark,
    value,
    setValue,
    saved,
    setSaved,
    submit,
  }
}

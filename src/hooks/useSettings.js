import { useState } from 'react'
import { useKharchaContext } from '../context/KharchaContext'

export function useSettings() {
  const { budget, saveBudget, isDark, setIsDark } = useKharchaContext()
  const [value, setValue] = useState(String(budget))
  const [saved, setSaved] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    saveBudget(value)
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

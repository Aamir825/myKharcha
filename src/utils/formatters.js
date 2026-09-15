export const money = (value) => {
  if (value === null || value === undefined || isNaN(value)) return 'PKR 0'
  return `PKR ${Math.round(value).toLocaleString('en-PK')}`
}

export const getMonthId = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export const formatMonthYear = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const subscribeBudget = (uid, callback, onError) => {
  if (!uid) return () => {}
  const budgetRef = doc(db, 'users', uid, 'settings', 'budget')

  return onSnapshot(
    budgetRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data()
        callback(Number(data.amount) || 140000)
      } else {
        // Fallback default budget
        callback(140000)
      }
    },
    (error) => {
      console.error('Failed to subscribe to budget:', error)
      if (onError) onError(error)
    }
  )
}

export const updateBudget = async (uid, amount) => {
  if (!uid) return
  const budgetRef = doc(db, 'users', uid, 'settings', 'budget')
  await setDoc(
    budgetRef,
    {
      amount: Number(amount),
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  )
}

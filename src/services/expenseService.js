import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const subscribeExpenses = (uid, callback, onError) => {
  const expensesRef = collection(db, 'users', uid, 'expenses')
  const expensesQuery = query(expensesRef, orderBy('date', 'desc'))

  return onSnapshot(
    expensesQuery,
    (snapshot) => {
      const expenses = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }))
      callback(expenses)
    },
    onError
  )
}

export const addExpense = async (uid, data) => {
  const expensesRef = collection(db, 'users', uid, 'expenses')
  const docRef = await addDoc(expensesRef, {
    date: data.date,
    category: data.category,
    amount: Number(data.amount),
    description: data.description || '',
    createdAt: new Date().toISOString(),
  })
  return docRef.id
}

export const updateExpense = async (uid, id, data) => {
  const expenseRef = doc(db, 'users', uid, 'expenses', id)
  await updateDoc(expenseRef, {
    date: data.date,
    category: data.category,
    amount: Number(data.amount),
    description: data.description || '',
    updatedAt: new Date().toISOString(),
  })
}

export const deleteExpense = async (uid, id) => {
  await deleteDoc(doc(db, 'users', uid, 'expenses', id))
}

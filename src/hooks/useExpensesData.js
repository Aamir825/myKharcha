import { useCallback, useSyncExternalStore } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import {
  subscribeExpenses,
  addExpense as addExpenseToFirestore,
  updateExpense as updateExpenseInFirestore,
  deleteExpense as deleteExpenseFromFirestore,
} from '../services/expenseService'

let authBridgeStarted = false

function ensureExpenseAuthBridge() {
  if (authBridgeStarted) return
  authBridgeStarted = true
  onAuthStateChanged(auth, (user) => {
    syncExpensesForUid(user?.uid ?? null)
  })
}

let expenses = []
let expensesLoading = false
let activeUid = null
let unsubscribeFirestore = null

// Centralized Dialog States
let isAddOpen = false
let editingExpense = null
let isDeleteOpen = false
let deletingExpense = null
let defaultDate = new Date().toISOString().split('T')[0]

const listeners = new Set()

function notify() {
  cachedSnapshot = {
    expenses,
    expensesLoading,
    uid: activeUid,
    isAddOpen,
    editingExpense,
    isDeleteOpen,
    deletingExpense,
    defaultDate,
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  ensureExpenseAuthBridge()
  listeners.add(listener)
  return () => listeners.delete(listener)
}

let cachedSnapshot = {
  expenses,
  expensesLoading,
  uid: activeUid,
  isAddOpen,
  editingExpense,
  isDeleteOpen,
  deletingExpense,
  defaultDate,
}

const serverSnapshot = {
  expenses: [],
  expensesLoading: false,
  uid: null,
  isAddOpen: false,
  editingExpense: null,
  isDeleteOpen: false,
  deletingExpense: null,
  defaultDate: '',
}

function getSnapshot() {
  return cachedSnapshot
}

function getServerSnapshot() {
  return serverSnapshot
}

export function syncExpensesForUid(uid) {
  if (uid === activeUid) return

  if (unsubscribeFirestore) {
    unsubscribeFirestore()
    unsubscribeFirestore = null
  }

  activeUid = uid

  if (!uid) {
    expenses = []
    expensesLoading = false
    notify()
    return
  }

  expensesLoading = true
  notify()

  unsubscribeFirestore = subscribeExpenses(
    uid,
    (nextExpenses) => {
      expenses = nextExpenses
      expensesLoading = false
      notify()
    },
    (error) => {
      console.error('Failed to load expenses:', error)
      expensesLoading = false
      notify()
    }
  )
}

// Global quick-add event listener
if (typeof window !== 'undefined') {
  window.addEventListener('open-add-expense', (event) => {
    const targetDate = event.detail?.date || new Date().toISOString().split('T')[0]
    editingExpense = null
    defaultDate = targetDate
    isAddOpen = true
    notify()
  })
}

export function useExpensesData() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const openAdd = useCallback((date) => {
    editingExpense = null
    defaultDate = date || new Date().toISOString().split('T')[0]
    isAddOpen = true
    notify()
  }, [])

  const openEdit = useCallback((expense) => {
    editingExpense = expense
    defaultDate = expense?.date || new Date().toISOString().split('T')[0]
    isAddOpen = true
    notify()
  }, [])

  const setIsAddOpen = useCallback((open) => {
    isAddOpen = open
    if (!open) {
      editingExpense = null
    }
    notify()
  }, [])

  const openDelete = useCallback((expense) => {
    deletingExpense = expense
    isDeleteOpen = true
    notify()
  }, [])

  const setIsDeleteOpen = useCallback((open) => {
    isDeleteOpen = open
    if (!open) {
      deletingExpense = null
    }
    notify()
  }, [])

  const saveExpense = useCallback(
    async (data) => {
      if (!snapshot.uid) return
      if (!data.amount || Number(data.amount) <= 0) return

      if (data.id) {
        await updateExpenseInFirestore(snapshot.uid, data.id, data)
      } else {
        await addExpenseToFirestore(snapshot.uid, data)
      }

      isAddOpen = false
      editingExpense = null
      notify()
    },
    [snapshot.uid]
  )

  const confirmDelete = useCallback(
    async (id) => {
      const targetId = id || deletingExpense?.id
      if (!snapshot.uid || !targetId) return

      await deleteExpenseFromFirestore(snapshot.uid, targetId)
      isDeleteOpen = false
      deletingExpense = null
      notify()
    },
    [snapshot.uid]
  )

  return {
    expenses: snapshot.expenses,
    expensesLoading: snapshot.expensesLoading,
    uid: snapshot.uid,
    isAddOpen: snapshot.isAddOpen,
    editingExpense: snapshot.editingExpense,
    isDeleteOpen: snapshot.isDeleteOpen,
    deletingExpense: snapshot.deletingExpense,
    defaultDate: snapshot.defaultDate,
    openAdd,
    openEdit,
    setIsAddOpen,
    openDelete,
    setIsDeleteOpen,
    saveExpense,
    confirmDelete,
  }
}

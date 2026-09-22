import { useCallback, useSyncExternalStore } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { subscribeBudget, updateBudget as updateBudgetInFirestore } from '../services/budgetService'

let budget = 140000
let activeUid = null
let unsubscribeFirestore = null
let authBridgeStarted = false
const listeners = new Set()

function notify() {
  listeners.forEach((listener) => listener())
}

function ensureBudgetAuthBridge() {
  if (authBridgeStarted) return
  authBridgeStarted = true
  onAuthStateChanged(auth, (user) => {
    syncBudgetForUid(user?.uid ?? null)
  })
}

function subscribe(listener) {
  ensureBudgetAuthBridge()
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return budget
}

function getServerSnapshot() {
  return 140000
}

export function syncBudgetForUid(uid) {
  if (uid === activeUid) return

  if (unsubscribeFirestore) {
    unsubscribeFirestore()
    unsubscribeFirestore = null
  }

  activeUid = uid

  if (!uid) {
    budget = 140000
    notify()
    return
  }

  unsubscribeFirestore = subscribeBudget(
    uid,
    (nextBudget) => {
      budget = nextBudget
      notify()
    },
    (error) => {
      console.error('Failed to sync budget:', error)
    }
  )
}

export function useBudget() {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const saveBudget = useCallback(
    async (next) => {
      const parsed = Number(next)
      if (!parsed || parsed < 0) return
      budget = parsed
      notify()
      if (activeUid) {
        await updateBudgetInFirestore(activeUid, parsed)
      }
    },
    []
  )

  return { budget: value, saveBudget }
}

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

export const loginUser = async (email, password) => {
  const userCredentials = await signInWithEmailAndPassword(auth, email, password)
  return userCredentials
}

export const registerUser = async (email, password, username) => {
  const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
  const uid = userCredentials.user.uid

  // Create user document in users collection (2 segments: users/{uid})
  await setDoc(doc(db, 'users', uid), {
    email: email,
    username: username,
    createdAt: new Date().toISOString(),
  })

  return userCredentials
}

export const getUserProfile = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid))
  if (userDoc.exists()) {
    return userDoc.data()
  }
  return null
}

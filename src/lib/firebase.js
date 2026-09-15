import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC5oHU5eRG0gwa4hIW7arz_vISoc6GR1AA',
  authDomain: 'mykharchaa.firebaseapp.com',
  projectId: 'mykharchaa',
  storageBucket: 'mykharchaa.firebasestorage.app',
  messagingSenderId: '114651682239',
  appId: '1:114651682239:web:8007797e38218aa3147d0a',
  measurementId: 'G-CZCXPE3BWN',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app

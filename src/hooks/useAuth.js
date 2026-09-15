import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, getUserProfile } from '../services/authService'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'


export function useAuth() {
    const [email, setEmail] = useState(localStorage.getItem("mykharcha-email") || '')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Get username from Firestore when user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const profile = await getUserProfile(user.uid)
                if (profile?.username) {
                    setUsername(profile.username)
                    localStorage.setItem("mykharcha-username", profile.username)
                }
            }
        })
        return () => unsubscribe()
    }, [])

    const handleLogin = async () => {
        try {
            setLoading(true)
            setError(null)
            const userCredentials = await loginUser(email, password)
            localStorage.setItem("mykharcha-email", email)

            // Get username from Firestore profile
            const profile = await getUserProfile(userCredentials.user.uid)
            if (profile?.username) {
                setUsername(profile.username)
                localStorage.setItem("mykharcha-username", profile.username)
            }

            navigate('/')
        } catch (err) {
            console.error('Login error:', err.message)
            if (err.code === 'auth/invalid-credential') {
                setError('Incorrect email or password')
            } else if (err.code === 'auth/user-not-found') {
                setError('No account found')
            } else if (err.code === 'auth/wrong-password') {
                setError('Wrong password')
            } else if (err.code === 'auth/network-request-failed') {
                setError('Network error. Please check your connection.')
            } else {
                setError(err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async () => {
        try {
            setLoading(true)
            setError(null)
            await registerUser(email, password, username)
            // After registration, redirect to login (not auto-login)
            return true
        } catch (err) {
            console.error('Register error:', err.message)
            if (err.code === 'auth/email-already-in-use') {
                setError('Email already in use')
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters')
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email address')
            } else {
                setError(err.message)
            }
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("mykharcha-email")
        localStorage.removeItem("mykharcha-username")
        setEmail('')
        setUsername('')
        navigate('/login')
    }

    const isLoggedIn = !!localStorage.getItem("mykharcha-email")

    // Use username from profile (stored in localStorage)
    const displayName = localStorage.getItem("mykharcha-username") || 'User'

    return {
        email,
        setEmail,
        password,
        setPassword,
        username,
        setUsername,
        loading,
        setError,
        error,
        displayName,
        handleLogin,
        handleRegister,
        handleLogout,
        isLoggedIn,
    }
}

export default useAuth

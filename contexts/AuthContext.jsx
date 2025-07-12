"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const userData = await response.json()
      setUser(userData)
      return userData
    } else {
      const error = await response.json()
      throw new Error(error.message || "Login failed")
    }
  }

  const signup = async (name, email, password) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })

    if (response.ok) {
      const userData = await response.json()
      setUser(userData)
      return userData
    } else {
      const error = await response.json()
      throw new Error(error.message || "Signup failed")
    }
  }

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

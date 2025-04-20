"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { AuthUser, getStoredUser, setStoredUser } from "./auth"

interface AuthContextType {
    user: AuthUser | null
    isAuthenticated: boolean
    login: (email: string, token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const storedUser = getStoredUser()
        if (storedUser) {
            setUser(storedUser)
            setIsAuthenticated(true)
        }
    }, [])

    const login = (email: string, token: string) => {
        const newUser = { email, token }
        setUser(newUser)
        setStoredUser(newUser)
        setIsAuthenticated(true)
    }

    const logout = () => {
        setUser(null)
        setStoredUser(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
} 
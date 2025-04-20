"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface ProtectedRouteProps {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
        return null // or a loading spinner
    }

    return <>{children}</>
} 
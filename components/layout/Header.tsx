"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

const Header = () => {
    const { isAuthenticated, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between mx-auto">
                <div className="flex items-center gap-2">
                    <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="SubME Logo"
                        width={40}
                        height={40}
                        className="rounded-md"
                    />
                    <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                        SubME
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                        About
                    </Link>
                    {isAuthenticated && <Link href="/console" className="text-sm font-medium transition-colors hover:text-primary">
                        Admin Console
                    </Link>}
                </nav>

                <div className="flex items-center gap-4">
                    {!isAuthenticated ? (
                        <>
                            <Button asChild variant="ghost" size="sm" className="hidden md:flex">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                className="hidden md:flex bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600"
                            >
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                                </svg>
                                <span className="sr-only">Notifications</span>
                            </Button>
                            <div className="relative">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full overflow-hidden"
                                    onClick={handleLogout}
                                >
                                    <Image
                                        src="/placeholder.svg?height=32&width=32"
                                        alt="User Avatar"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <span className="sr-only">User Menu</span>
                                </Button>
                            </div>
                        </>
                    )}
                    <Button variant="outline" size="icon" className="md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                            <line x1="4" x2="20" y1="6" y2="6"></line>
                            <line x1="4" x2="20" y1="18" y2="18"></line>
                        </svg>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export { Header }
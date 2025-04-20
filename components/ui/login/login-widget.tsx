"use client"

import { useState } from "react"
import { Button } from "../button"
import { Input } from "../input"
import { generateOTP, verifyOTP } from "@/lib/api"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

function LoginWidget() {
    const { login } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [step, setStep] = useState<"email" | "otp">("email")

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleEmailSubmit = async () => {
        setError("")
        
        if (!email) {
            setError("Email is required")
            return
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address")
            return
        }

        setIsLoading(true)
        try {
            await generateOTP(email)
            toast.success("OTP has been sent to your email")
            setStep("otp")
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                toast.error(error.message)
            } else {
                setError("An unexpected error occurred")
                toast.error("An unexpected error occurred")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleOtpSubmit = async () => {
        if (!otp) {
            setError("OTP code is required")
            return
        }

        setIsLoading(true)
        try {
            const response = await verifyOTP(email, otp)
            toast.success("OTP verified successfully")
            login(email, response.token)
            router.push("/console")
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                toast.error(error.message)
            } else {
                setError("An unexpected error occurred")
                toast.error("An unexpected error occurred")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleBack = () => {
        setStep("email")
        setOtp("")
        setError("")
    }

    return (
        <div className="w-full max-w-sm space-y-2">
            <div className="space-y-2 mb-4">
                <Input 
                    type="email" 
                    placeholder="i.e. videos@sub.me" 
                    className={`w-full ${error ? "border-red-500" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && step === "email") {
                            handleEmailSubmit()
                        }
                    }}
                    readOnly={step === "otp"}
                />
                {step === "otp" && (
                    <Input
                        type="text"
                        placeholder="Enter OTP code"
                        className={`w-full ${error ? "border-red-500" : ""}`}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && step === "otp") {
                                handleOtpSubmit()
                            }
                        }}
                    />
                )}
                {error && (
                    <p className="text-sm text-red-500 -mt-3">{error}</p>
                )}
            </div>
            <div className="flex gap-2">
                {step === "otp" && (
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                )}
                <Button 
                    className={`flex-1 bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 ${step === "otp" ? "flex-1" : "w-full"}`}
                    onClick={step === "email" ? handleEmailSubmit : handleOtpSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : step === "email" ? "Sign up with email" : "Verify code"}
                </Button>
            </div>
        </div>
    )
}

export { LoginWidget }
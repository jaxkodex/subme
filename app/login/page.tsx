import { Header } from "@/components/layout/Header"
import { LoginWidget } from "@/components/ui/login/login-widget"

export default function Login() {
    return (
        <main className="flex min-h-screen flex-col">
            <Header />
            <section className="relative w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2 mb-16">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                                Start for free
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                To avoid abuse, please sign up with your email.
                            </p>
                        </div>
                        <LoginWidget />
                    </div>
                </div>
            </section>
        </main>
    )
}
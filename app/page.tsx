import Link from "next/link"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import VideoCard from "@/components/video-card"
import { Header } from "@/components/layout/Header"
import { FileUpload } from "@/components/ui/home/file-upload"

export default function Home() {
  // Sample data for showcase videos
  const showcaseVideos = [
    {
      id: 1,
      username: "JaneDoe",
      date: "May 15, 2023",
      videoUrl: "/placeholder.svg?height=400&width=600",
      title: "Summer Vibes",
    },
    {
      id: 2,
      username: "JohnSmith",
      date: "June 3, 2023",
      videoUrl: "/placeholder.svg?height=400&width=600",
      title: "City Lights",
    },
    {
      id: 3,
      username: "AlexWong",
      date: "April 22, 2023",
      videoUrl: "/placeholder.svg?height=400&width=600",
      title: "Mountain Escape",
    },
    {
      id: 4,
      username: "SamJohnson",
      date: "July 10, 2023",
      videoUrl: "/placeholder.svg?height=400&width=600",
      title: "Beach Day",
    },
    {
      id: 5,
      username: "TaylorReid",
      date: "August 5, 2023",
      videoUrl: "/placeholder.svg?height=400&width=600",
      title: "Urban Adventure",
    },
    {
      id: 6,
      username: "JordanLee",
      date: "September 12, 2023",
      videoUrl: "/placeholder.svg?height=400&width=600",
      title: "Sunset Dreams",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Add Stunning Subtitles to Your Videos
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Transform your content with eye-catching subtitles that grab attention and boost engagement.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <FileUpload />
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trending Videos</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Check out what others are creating with SubME
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {showcaseVideos.map((video) => (
              <VideoCard
                key={video.id}
                username={video.username}
                date={video.date}
                videoUrl={video.videoUrl}
                title={video.title}
              />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button variant="outline" className="rounded-full">
              View More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground">© 2023 SubME. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

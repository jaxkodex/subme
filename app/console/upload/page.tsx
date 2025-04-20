import { Header } from "@/components/layout/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SideMenu } from "@/components/ui/console/side-menu"
import { UploadVideoFilePicker } from "@/components/ui/console/upload/upload-video-file-picker"
import { VideoUploadForm } from "@/components/ui/console/upload/video-upload-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Video } from "lucide-react"

export default function UploadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-6 mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <SideMenu />

        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Upload Video</h1>
            <p className="text-muted-foreground">Add subtitles to your video in just a few steps</p>
          </div>

          <VideoUploadForm />
        </div>
        </div>
      </main>
    </div>
  )
}

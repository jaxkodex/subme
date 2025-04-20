import Image from "next/image"
import { Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface VideoCardProps {
  username: string
  date: string
  videoUrl: string
  title: string
}

export default function VideoCard({ username, date, videoUrl, title }: VideoCardProps) {
  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <Image
            src={videoUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="ghost" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <Play className="h-6 w-6 text-white" fill="white" />
              <span className="sr-only">Play video</span>
            </Button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-4 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                {username.charAt(0)}
              </div>
              <span className="text-white font-medium text-sm">{username}</span>
            </div>
            <div>
              <h3 className="text-white font-bold">{title}</h3>
              <p className="text-white/70 text-xs">{date}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

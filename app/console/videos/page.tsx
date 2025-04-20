"use client"

import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { Header } from "@/components/layout/Header"
import { SideMenu } from "@/components/ui/console/side-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { listVideos } from "@/lib/api"
import { Badge } from "@/components/ui/badge"

interface Video {
  id: string
  filename: string
  timestamp: string
  status: string
  createdAt: string
  fileSize: number
  contentType: string
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [nextToken, setNextToken] = useState<string | undefined>(undefined)
  const [hasMore, setHasMore] = useState(true)

  const loadVideos = async (token?: string) => {
    try {
      const response = await listVideos(token)
      if (token) {
        setVideos(prev => [...prev, ...response.videos])
      } else {
        setVideos(response.videos)
      }
      setNextToken(response.nextToken)
      setHasMore(!!response.nextToken)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to load videos")
      }
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    loadVideos()
  }, [])

  const handleLoadMore = () => {
    if (nextToken && !isLoadingMore) {
      setIsLoadingMore(true)
      loadVideos(nextToken)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 container py-6 mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <SideMenu />

            <div className="flex-1">
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">My Videos</h1>
                <p className="text-muted-foreground">View and manage your uploaded videos</p>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/6"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : videos.length > 0 ? (
                <div className="space-y-4">
                  {videos.map((video) => (
                    <Card key={video.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{video.filename} <Badge className="ml-2" variant={video.status === 'processed' ? 'default' : 'secondary'}>{video.status}</Badge></CardTitle>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <p>{formatDate(video.createdAt)}</p>
                              <p>Size: {formatFileSize(video.fileSize)}</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.success(`Downloading ${video.filename}...`)}
                            disabled={video.status !== 'processed'}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {hasMore && (
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="outline"
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                      >
                        {isLoadingMore ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          'Load More'
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      You haven't uploaded any videos yet.
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="mt-8 text-sm text-muted-foreground">
                <p>Note: Videos are automatically deleted after 7 days.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
} 
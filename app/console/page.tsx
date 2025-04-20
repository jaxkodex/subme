"use client"

import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { Header } from "@/components/layout/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SideMenu } from "@/components/ui/console/side-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Film, Upload, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen flex-col">
                <Header />

                <main className="flex-1 container py-6 mx-auto">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar */}
                        <SideMenu />

                        {/* Main Content */}
                        <div className="flex-1">
                            <div className="grid gap-6">
                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                                    <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                                            <Film className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">12</div>
                                            <p className="text-xs text-muted-foreground">+2 from last month</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
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
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">1,234</div>
                                            <p className="text-xs text-muted-foreground">+24% from last month</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Processing</CardTitle>
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">1</div>
                                            <p className="text-xs text-muted-foreground">Video currently processing</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Followers</CardTitle>
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">42</div>
                                            <p className="text-xs text-muted-foreground">+5 new followers this week</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Tabs defaultValue="recent">
                                    <div className="flex items-center justify-between">
                                        <TabsList>
                                            <TabsTrigger value="recent">Recent Videos</TabsTrigger>
                                            <TabsTrigger value="popular">Popular Videos</TabsTrigger>
                                        </TabsList>
                                        <Button
                                            size="sm"
                                            className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600"
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload New
                                        </Button>
                                    </div>
                                    <TabsContent value="recent" className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {[1, 2, 3].map((i) => (
                                                <Card key={i}>
                                                    <CardContent className="p-0">
                                                        <div className="relative aspect-video">
                                                            <Image
                                                                src={`/placeholder.svg?height=200&width=300&text=Video ${i}`}
                                                                alt={`Video ${i}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                                                                2:34
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                    <CardHeader className="p-3">
                                                        <CardTitle className="text-sm">Amazing Video Title {i}</CardTitle>
                                                        <CardDescription className="text-xs">Uploaded 2 days ago • 123 views</CardDescription>
                                                    </CardHeader>
                                                    <CardFooter className="p-3 pt-0 flex justify-between">
                                                        <Button variant="ghost" size="sm">
                                                            Edit
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            Share
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="popular" className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {[4, 5, 6].map((i) => (
                                                <Card key={i}>
                                                    <CardContent className="p-0">
                                                        <div className="relative aspect-video">
                                                            <Image
                                                                src={`/placeholder.svg?height=200&width=300&text=Popular ${i}`}
                                                                alt={`Video ${i}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                                                                3:45
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                    <CardHeader className="p-3">
                                                        <CardTitle className="text-sm">Popular Video Title {i}</CardTitle>
                                                        <CardDescription className="text-xs">Uploaded 2 weeks ago • 1.2k views</CardDescription>
                                                    </CardHeader>
                                                    <CardFooter className="p-3 pt-0 flex justify-between">
                                                        <Button variant="ghost" size="sm">
                                                            Edit
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            Share
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    )
}

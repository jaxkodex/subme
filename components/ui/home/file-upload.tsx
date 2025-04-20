"use client"

import { Upload } from "lucide-react";
import { Button } from "../button";
import { useRef, useState } from "react";

function FileUpload() {
    const videoInputRef = useRef<HTMLInputElement>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setVideoUrl(videoUrl);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            {videoUrl && <video src={videoUrl} controls className="w-full rounded-lg mb-4" />}
            {!videoUrl && <div className="relative w-full max-w-md h-64 border-2 border-dashed border-primary/50 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                <Upload className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="text-sm text-muted-foreground mt-2">Drag and drop your video here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Supports MP4, MOV, AVI (max 20MB)</p>
                <input
                    type="file"
                    accept="video/*"
                    ref={videoInputRef}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>}
            <Button className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600">
                Upload & Process
            </Button>
        </div>
    )
}

export { FileUpload };
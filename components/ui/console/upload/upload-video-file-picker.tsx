"use client"

import { Upload, Video } from "lucide-react";
import { Button } from "../../button";
import { useRef } from "react";
import { useState } from "react";

interface UploadVideoFilePickerProps {
  onFileSelect: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function UploadVideoFilePicker({ onFileSelect, fileInputRef }: UploadVideoFilePickerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const videoUrl = URL.createObjectURL(file);
          setVideoUrl(videoUrl);
          onFileSelect(file);
      }
  }

  return (
    <div className="relative">
      {videoUrl && <video src={videoUrl} controls className="max-h-[300px] rounded-lg mb-4 mx-auto" />}
      {videoUrl && <button className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-8 h-8" onClick={() => {
        setVideoUrl(null);
        if (fileInputRef?.current) {
          fileInputRef.current.value = "";
        }
      }}>x</button>}
      {!videoUrl &&<div className="relative border-2 border-dashed border-primary/50 rounded-lg p-10 text-center hover:bg-muted/50 transition-colors cursor-pointer">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-primary/10 p-4 rounded-full">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Drag and drop your video here</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Or click to browse your files. We recommend videos under 5 minutes for best results.
          </p>
          <Button className="mt-4 bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600">
            <Video className="h-4 w-4 mr-2" />
            Select Video
          </Button>
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="video/*" />
      </div>}
    </div>
  )
}
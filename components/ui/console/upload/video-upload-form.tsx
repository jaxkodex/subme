"use client"

import { Button } from "../../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../card";
import { Label } from "../../label";
import { UploadVideoFilePicker } from "./upload-video-file-picker";
import { getUploadUrl, uploadFile } from "@/lib/api";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function VideoUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a video file first");
      return;
    }

    setIsUploading(true);
    try {
      // Get signed URL with file size
      const { signedUrl, userId, fileId } = await getUploadUrl(selectedFile.name, selectedFile.size);
      
      // Upload file to signed URL with metadata
      await uploadFile(selectedFile, signedUrl, userId, fileId);
      
      toast.success("Video uploaded successfully!");
      // Reset form
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to upload video");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Video Upload</CardTitle> */}
        <CardDescription>
          Upload your video file to get started. We support MP4, MOV, and AVI formats up to 500MB.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <UploadVideoFilePicker onFileSelect={handleFileSelect} fileInputRef={fileInputRef} />

        <div className="space-y-4">
          {/* <div className="space-y-2">
                  <Label htmlFor="title">Video Title</Label>
                  <Input id="title" placeholder="Enter a title for your video" />
                </div> */}
          {/* <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea id="description" placeholder="Add a description to your video" />
                </div> */}
          <div className="space-y-2">
            <Label htmlFor="language">Subtitle Language</Label>
            <select
              id="language"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              {/* <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option> */}
            </select>
          </div>
          {/* <div className="space-y-2">
                  <Label htmlFor="style">Subtitle Style</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center">
                      <div className="w-full h-12 bg-muted rounded mb-2 flex items-end justify-center pb-1">
                        <span className="text-xs bg-white text-black px-2 py-0.5 rounded">Classic</span>
                      </div>
                      <span className="text-xs">Classic</span>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center">
                      <div className="w-full h-12 bg-muted rounded mb-2 flex items-end justify-center pb-1">
                        <span className="text-xs bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-2 py-0.5 rounded">
                          Colorful
                        </span>
                      </div>
                      <span className="text-xs">Colorful</span>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center">
                      <div className="w-full h-12 bg-muted rounded mb-2 flex items-end justify-center pb-1">
                        <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">Minimal</span>
                      </div>
                      <span className="text-xs">Minimal</span>
                    </div>
                  </div>
                </div> */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}>
          Cancel
        </Button>
        <Button 
          className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600"
          onClick={handleUpload}
          disabled={isUploading || !selectedFile}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload & Process"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
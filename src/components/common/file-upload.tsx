"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { File, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

interface Props {
  endPoint: keyof typeof ourFileRouter;
  onChange: (url?: string) => void;
  value?: string;
  uploadLabel?: string;
}
export const FileUpload = ({
  endPoint,
  onChange,
  value,
  uploadLabel = "Choose a file or drag and drop",
}: Props) => {
  const type = value?.split(".").pop();
  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== "pdf" ? (
          <div className="relative size-40">
            <Image
              src={value}
              alt="Upload Image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div className="flex items-center p-2 mt-2 rounded-md bg-background/10 relative">
            <File />{" "}
            <a
              href={value}
              target="_blank"
              rel="noopener_moreferrer"
              className="ml-2 text-sm text-indigo-500 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button onClick={() => onChange("")} variant={"ghost"} type="button">
          <X size={16} /> Remove Logo
        </Button>
      </div>
    );
  }
  return (
    <div className="bg-muted/30">
      <UploadDropzone
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].ufsUrl);
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
        appearance={{ uploadIcon: "h-10" }}
        content={{ label: uploadLabel }}
      />
    </div>
  );
};

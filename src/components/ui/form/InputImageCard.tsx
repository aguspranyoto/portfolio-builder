"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import AttachmentIcon from "@/components/icons/AttachmentIcon";

type InputImageCardProps = {
    title: string;
    imageUrl: string;
    onImageChange: (url: string) => void;
};

export default function InputImageCard({
    title,
    imageUrl,
    onImageChange,
}: InputImageCardProps) {
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Convert the file to a Base64 string to be stored
        const reader = new FileReader();
        reader.onload = () => {
            onImageChange(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="underline">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Display the current image if it exists */}
                {imageUrl ? (
                    <div className="relative mt-2 h-48 w-full">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="rounded-md object-cover"
                        />
                    </div>
                ) : (
                    // Otherwise, show the upload box
                    <div className="bg-[#EBEBEB] size-full">
                        <div className="flex flex-col justify-center items-center size-full py-12">
                            <AttachmentIcon className="size-5 fill-gray-400 rotate-45 mb-4" />
                            <div className="text-sm font-medium mb-1 ">
                                Drag and drop or{" "}
                                <div className="text-blue-500 relative inline-flex">
                                    Browse
                                    <div>
                                        <input
                                            id={`file-upload-${title}`}
                                            type="file"
                                            className="opacity-0 absolute inset-0 w-full h-full"
                                            accept="image/png, image/jpeg, image/jpg"
                                            onChange={handleFileSelect}
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs underline text-[#9F9F9F]">
                                Support formats : png, jpg, jpeg, mp4.
                            </p>
                            <p className="text-xs underline text-[#9F9F9F]">
                                Max size : 500Mb
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

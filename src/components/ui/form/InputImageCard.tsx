"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import AttachmentIcon from "@/components/icons/AttachmentIcon";
import OpenFullscreenIcon from "@/components/icons/OpenFullscreenIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { Button } from "../button";
import { PopoverClose } from "@radix-ui/react-popover";
import { imageFileSchema } from "@/lib/validations";

type InputImageCardProps = {
    title: string;
    imageFile: string | null;
    onImageChange: (file: string | null) => void;
    onOpenInDialog?: () => void;
    isInDialog?: boolean;
    error?: string;
};

export default function InputImageCard({
    title,
    imageFile,
    onImageChange,
    onOpenInDialog,
    isInDialog,
    error,
}: InputImageCardProps) {
    const [localError, setLocalError] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            if (!file) return;

            const validationResult = imageFileSchema.safeParse(file);

            if (validationResult.success) {
                setLocalError(null);
                const reader = new FileReader();
                reader.onload = () => {
                    onImageChange(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                const message = validationResult.error.issues[0]?.message;
                setLocalError(message || "Invalid file.");
                onImageChange(null);
            }
        },

        [onImageChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,

        accept: {
            "image/png": [".png"],

            "image/jpeg": [".jpeg", ".jpg"],

            "video/mp4": [".mp4"],
        },

        maxSize: 500 * 1024 * 1024,

        multiple: false,
    });

    const removeImage = () => {
        onImageChange(null);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="underline">{title}</CardTitle>

                <CardAction>
                    <div
                        className={`flex items-center gap-5 ${
                            isInDialog && "mr-8"
                        }`}
                    >
                        {imageFile && (
                            <>
                                <Popover>
                                    <PopoverTrigger className="cursor-pointer">
                                        <DeleteIcon className="size-4 fill-[#6C7074]" />
                                    </PopoverTrigger>

                                    <PopoverContent className="w-max px-6">
                                        <p className="mb-3 text-sm">
                                            Are you sure?
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <div
                                                onClick={removeImage}
                                                className="cursor-pointer"
                                            >
                                                <Button
                                                    className="cursor-pointer rounded-sm h-6 text-sm"
                                                    size={"sm"}
                                                    variant="default"
                                                >
                                                    Yes
                                                </Button>
                                            </div>

                                            <PopoverClose asChild>
                                                <Button
                                                    className="cursor-pointer rounded-sm h-6 text-sm"
                                                    size={"sm"}
                                                    variant="outline"
                                                >
                                                    No
                                                </Button>
                                            </PopoverClose>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                        )}

                        {!isInDialog && onOpenInDialog && (
                            <div onClick={onOpenInDialog}>
                                <OpenFullscreenIcon className="size-4.5 fill-[#6C7074] cursor-pointer" />
                            </div>
                        )}
                    </div>
                </CardAction>
            </CardHeader>

            <CardContent>
                {imageFile ? (
                    <div
                        className={`relative mt-2 w-full ${
                            isInDialog ? "h-[40vh] md:h-[60vh]" : "h-48"
                        }`}
                    >
                        <Image
                            src={imageFile}
                            alt={title}
                            fill
                            className="rounded-md object-cover"
                        />
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className="bg-[#EBEBEB] size-full outline-none"
                    >
                        <div
                            className={`flex flex-col justify-center items-center size-full py-12 ${
                                isInDialog ? "h-[40vh] md:h-[60vh]" : ""
                            }`}
                        >
                            <AttachmentIcon className="size-5 fill-gray-400 rotate-45 mb-4" />

                            <div className="text-sm font-medium mb-1 ">
                                {isDragActive
                                    ? "Drop the file here..."
                                    : "Drag and drop or "}

                                <span className="text-blue-500">Browse</span>
                            </div>

                            <input {...getInputProps()} />

                            <p className="text-xs underline text-[#9F9F9F] mb-1">
                                Support formats : png, jpg, jpeg, webp.
                            </p>

                            <p className="text-xs underline text-[#9F9F9F]">
                                Max size : 2MB
                            </p>
                        </div>
                    </div>
                )}

                {(localError || error) && (
                    <p className="text-red-500 text-xs mt-2">
                        {localError || error}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

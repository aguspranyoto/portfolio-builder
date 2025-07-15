import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../input";
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
    return (
        <Card>
            <CardHeader>
                <CardTitle className="underline">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="bg-[#EBEBEB] size-full">
                    <div className="flex flex-col justify-center items-center size-full py-18">
                        <AttachmentIcon className="size-4.5 fill-[#9F9F9F] rotate-45 mb-5" />
                        <div className="size-full flex flex-col justify-center items-center space-y-2 ">
                            <div className="underline text-sm font-medium ">
                                Drag and drop files, or{" "}
                                <div className="inline-flex text-[#0584F9] relative">
                                    Browse
                                    <Input
                                        type="file"
                                        className="opacity-0 absolute inset-0 size-full cursor-pointer "
                                        placeholder="..."
                                        value={imageUrl}
                                        onChange={(e) =>
                                            onImageChange(e.target.value)
                                        }
                                    />
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
                </div>
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="mt-2 rounded-md max-h-48 w-full object-cover"
                    />
                )}
            </CardContent>
        </Card>
    );
}

import React from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import OpenFullscreenIcon from "@/components/icons/OpenFullscreenIcon";
import AttachmentIcon from "@/components/icons/AttachmentIcon";

type InputImageCardProps = {
    title: string;
};

export default function InputImageCard({ title }: InputImageCardProps) {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="underline">{title ?? ""}</CardTitle>
                    <CardAction>
                        <OpenFullscreenIcon className="size-4.5 fill-gray-400" />
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="bg-[#EBEBEB] size-full">
                        <div className="flex flex-col justify-center items-center size-full py-18">
                            <AttachmentIcon className="size-4.5 fill-gray-400 rotate-45 mb-5" />
                            <div className="size-full flex flex-col justify-center items-center space-y-2 ">
                                <p className="underline text-sm font-medium">
                                    Drag and drop files, or{" "}
                                    <span className="text-blue-500">
                                        Browse
                                    </span>
                                </p>
                                <p className="text-xs underline text-gray-400">
                                    Support formats : png, jpg, jpeg, mp4.
                                </p>
                                <p className="text-xs underline text-gray-400">
                                    Max size : 500Mb
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

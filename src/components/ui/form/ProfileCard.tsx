import OpenFullscreenIcon from "@/components/icons/OpenFullscreenIcon";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Input } from "../input";
import { Textarea } from "../textarea";

export default function ProfileCard() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="underline">Profile</CardTitle>
                    <CardAction>
                        <OpenFullscreenIcon className="size-4.5 fill-gray-400" />
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 size-full">
                        <div>
                            <Input
                                placeholder="Name"
                                className="placeholder:underline "
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="Title/Posisi"
                                className="placeholder:underline"
                            />
                        </div>
                        <div>
                            <Textarea
                                placeholder="Deskripsi"
                                className="placeholder:underline min-h-[125px]"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

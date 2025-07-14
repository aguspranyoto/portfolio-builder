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

export default function ExperienceCard() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="underline">Portfolio</CardTitle>
                    <CardAction>
                        <OpenFullscreenIcon className="size-4.5 fill-gray-400" />
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 size-full pr-[180px]">
                        <div>
                            <Input
                                placeholder="Nama"
                                className="placeholder:underline "
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="Posisi"
                                className="placeholder:underline"
                            />
                        </div>
                        <div>
                            <Textarea
                                placeholder="Perusahaan"
                                className="placeholder:underline min-h-[125px]"
                            />
                        </div>
                        <div className="flex gap-3 justify-between">
                            <Input
                                placeholder="Tanggal Mulai"
                                className="placeholder:underline"
                            />
                            <Input
                                placeholder="Tanggal Selesai"
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

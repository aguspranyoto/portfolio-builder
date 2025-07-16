import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "../input";
import { Textarea } from "../textarea";
import OpenFullscreenIcon from "@/components/icons/OpenFullscreenIcon";

type ProfileCardProps = {
    profile: {
        name: string;
        job_title: string;
        job_description: string;
    };
    updateField: (
        field: "name" | "job_title" | "job_description",
        value: string
    ) => void;
    onOpenInDialog?: () => void;
    isInDialog?: boolean;
    errors?: {
        name?: string[];
        job_title?: string[];
        job_description?: string[];
    };
};

export default function ProfileCard(props: ProfileCardProps) {
    const { profile, updateField, onOpenInDialog, isInDialog, errors } = props;

    return (
        <Card className="rounded-xl">
            <CardHeader>
                <CardTitle className="underline">Profile</CardTitle>
                <CardAction>
                    {!isInDialog && onOpenInDialog && (
                        <div onClick={onOpenInDialog}>
                            <OpenFullscreenIcon className="size-4.5 fill-[#6C7074] cursor-pointer" />
                        </div>
                    )}
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 size-full">
                    <div>
                        <Input
                            placeholder="Nama"
                            value={profile.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                            className="placeholder:underline"
                        />
                        {errors?.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            placeholder="Title/Posisi"
                            value={profile.job_title}
                            onChange={(e) =>
                                updateField("job_title", e.target.value)
                            }
                            className="placeholder:underline"
                        />
                        {errors?.job_title && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.job_title[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <Textarea
                            placeholder="Deskripsi"
                            value={profile.job_description}
                            onChange={(e) =>
                                updateField("job_description", e.target.value)
                            }
                            className="placeholder:underline min-h-[125px]"
                        />
                        {errors?.job_description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.job_description[0]}
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

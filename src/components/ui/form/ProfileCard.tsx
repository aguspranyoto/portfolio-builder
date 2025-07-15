import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../input";
import { Textarea } from "../textarea";

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
};

export default function ProfileCard({
    profile,
    updateField,
}: ProfileCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="underline">Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 size-full">
                    <Input
                        placeholder="Name"
                        value={profile.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="placeholder:underline"
                    />
                    <Input
                        placeholder="Title/Posisi"
                        value={profile.job_title}
                        onChange={(e) =>
                            updateField("job_title", e.target.value)
                        }
                        className="placeholder:underline"
                    />
                    <Textarea
                        placeholder="Deskripsi"
                        value={profile.job_description}
                        onChange={(e) =>
                            updateField("job_description", e.target.value)
                        }
                        className="placeholder:underline min-h-[125px]"
                    />
                </div>
            </CardContent>
        </Card>
    );
}

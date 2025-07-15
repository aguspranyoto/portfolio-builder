import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardAction,
} from "@/components/ui/card";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { Button } from "../button";
import type { Experience } from "@/stores/portfolioStore";

type ExperienceCardProps = {
    experience: Experience;
    index: number;
    updateField: (id: string, field: keyof Experience, value: string) => void;
    deleteExperience: (id: string) => void;
    isDeletable: boolean;
};

export default function ExperienceCard({
    experience,
    index,
    updateField,
    deleteExperience,
    isDeletable,
}: ExperienceCardProps) {
    const handleChange = (field: keyof Experience, value: string) => {
        updateField(experience.id, field, value);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="underline">Portfolio #{index}</CardTitle>
                <CardAction>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteExperience(experience.id)}
                        disabled={!isDeletable}
                    >
                        Hapus
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 size-full">
                    <Input
                        placeholder="Posisi"
                        value={experience.position}
                        onChange={(e) =>
                            handleChange("position", e.target.value)
                        }
                        className="placeholder:underline"
                    />
                    <Input
                        placeholder="Perusahaan"
                        value={experience.company}
                        onChange={(e) =>
                            handleChange("company", e.target.value)
                        }
                        className="placeholder:underline"
                    />
                    <div className="flex gap-3 justify-between">
                        <Input
                            placeholder="Tanggal Mulai"
                            type="date"
                            value={experience.start_date}
                            onChange={(e) =>
                                handleChange("start_date", e.target.value)
                            }
                            className="placeholder:underline"
                        />
                        <Input
                            placeholder="Tanggal Selesai"
                            type="date"
                            value={experience.end_date}
                            onChange={(e) =>
                                handleChange("end_date", e.target.value)
                            }
                            className="placeholder:underline"
                        />
                    </div>
                    <Textarea
                        placeholder="Deskripsi"
                        value={experience.description}
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                        className="placeholder:underline min-h-[125px]"
                    />
                </div>
            </CardContent>
        </Card>
    );
}

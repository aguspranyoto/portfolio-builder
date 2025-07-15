// src/components/ui/form/ExperienceCard.tsx
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
import CloseCircleIcon from "@/components/icons/CloseCircleIcon";
import CustomDatePicker from "@/components/CustomDatePicker";

type ExperienceCardProps = {
    experience: Experience;
    index: number;
    updateField: (id: string, field: keyof Experience, value: string) => void;
    deleteExperience: (id: string) => void;
    isDeletable: boolean;
};

// Helper to safely convert a date string to a Date object
const toDate = (dateString?: string): Date | undefined => {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) ? date : undefined;
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

    // Handler for when a date is changed in the date picker
    const handleDateChange = (
        field: "start_date" | "end_date",
        newDate: Date | undefined
    ) => {
        // Format to YYYY-MM-DD string for storage, or an empty string if undefined
        const newValue = newDate ? newDate.toISOString().split("T")[0] : "";
        updateField(experience.id, field, newValue);
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
                        className="cursor-pointer"
                    >
                        <CloseCircleIcon className="size-4.5 fill-[#6C7074]" />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 size-full">
                    {/* Position and Company Inputs */}
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

                    {/* Controlled Date Pickers */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-between">
                        <CustomDatePicker
                            title="Tanggal Mulai"
                            date={toDate(experience.start_date)}
                            onDateChange={(newDate) =>
                                handleDateChange("start_date", newDate)
                            }
                        />
                        <CustomDatePicker
                            title="Tanggal Selesai"
                            date={toDate(experience.end_date)}
                            onDateChange={(newDate) =>
                                handleDateChange("end_date", newDate)
                            }
                        />
                    </div>

                    {/* Description Textarea */}
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

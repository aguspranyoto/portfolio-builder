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
import OpenFullscreenIcon from "@/components/icons/OpenFullscreenIcon";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { PopoverClose } from "@radix-ui/react-popover";

type ExperienceCardProps = {
    experience: Experience;
    index: number;
    updateField: (id: string, field: keyof Experience, value: string) => void;
    deleteExperience: (id: string) => void;
    isDeletable: boolean;
    onOpenInDialog?: () => void;
    isInDialog?: boolean;
    errors?: ExperienceErrors;
};

type ExperienceErrors = {
    position?: string[];
    company?: string[];
    description?: string[];
    start_date?: string[];
    end_date?: string[];
};

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
    onOpenInDialog,
    isInDialog,
    errors,
}: ExperienceCardProps) {
    const handleChange = (field: keyof Experience, value: string) => {
        updateField(experience.id, field, value);
    };

    const handleDateChange = (
        field: "start_date" | "end_date",
        newDate: Date | undefined
    ) => {
        const newValue = newDate ? newDate.toISOString().split("T")[0] : "";
        updateField(experience.id, field, newValue);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="underline">Portfolio #{index}</CardTitle>
                <CardAction>
                    <div className="flex items-center gap-3">
                        {!isInDialog && (
                            <>
                                <Popover>
                                    <PopoverTrigger
                                        className={`${
                                            !isDeletable
                                                ? "pointer-events-none cursor-not-allowed opacity-40"
                                                : "pointer-events-auto cursor-pointer"
                                        } `}
                                    >
                                        <CloseCircleIcon className="size-4.5 fill-[#6C7074]" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-max px-6">
                                        <p className="mb-3 text-sm">
                                            Are you sure?
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div
                                                onClick={() =>
                                                    deleteExperience(
                                                        experience.id
                                                    )
                                                }
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
                <div className="space-y-4 size-full">
                    {/* Position and Company Inputs */}
                    <div>
                        <Input
                            placeholder="Posisi"
                            value={experience.position}
                            onChange={(e) =>
                                handleChange("position", e.target.value)
                            }
                            className="placeholder:underline"
                        />
                        {errors?.position && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.position[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            placeholder="Perusahaan"
                            value={experience.company}
                            onChange={(e) =>
                                handleChange("company", e.target.value)
                            }
                            className="placeholder:underline"
                        />
                        {errors?.company && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.company[0]}
                            </p>
                        )}
                    </div>

                    {/* Controlled Date Pickers */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-between">
                        <div className="w-full">
                            <CustomDatePicker
                                title="Tanggal Mulai"
                                date={toDate(experience.start_date)}
                                onDateChange={(newDate) =>
                                    handleDateChange("start_date", newDate)
                                }
                            />
                            {errors?.start_date && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.start_date[0]}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <CustomDatePicker
                                title="Tanggal Selesai"
                                date={toDate(experience.end_date)}
                                onDateChange={(newDate) =>
                                    handleDateChange("end_date", newDate)
                                }
                            />
                            {errors?.end_date && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.end_date[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <Textarea
                            placeholder="Deskripsi"
                            value={experience.description}
                            onChange={(e) =>
                                handleChange("description", e.target.value)
                            }
                            className="placeholder:underline min-h-[125px]"
                        />
                        {errors?.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description[0]}
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

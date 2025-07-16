"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/ui/form/ExperienceCard";
import InputImageCard from "@/components/ui/form/InputImageCard";
import ProfileCard from "@/components/ui/form/ProfileCard";
import { usePortfolioStore } from "@/stores/portfolioStore";
import PreviewCard from "@/components/PreviewCard";
import { toast } from "sonner";
import SuccessIcon from "@/components/icons/SuccessIcon";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { portfolioSchema } from "@/lib/validations";
import { ZodError } from "zod";

export default function Edit() {
    const {
        portfolio,
        updateProfileField,
        updateExperienceField,
        addExperience,
        deleteExperience,
        updateImage,
    } = usePortfolioStore();

    const [hasMounted, setHasMounted] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeModalId, setActiveModalId] = useState<string | null>(null);

    const [errors, setErrors] = useState<{
        images?: { background_image?: string[]; profile_image?: string[] };
        profile?: {
            name?: string[];
            job_title?: string[];
            job_description?: string[];
        };
        experiences?: { [key: string]: { [key: string]: string[] } };
    }>({});

    const openDialogFor = (id: string) => {
        setActiveModalId(id);
        setIsDialogOpen(true);
    };

    useEffect(() => {
        setHasMounted(true);
        const currentState = usePortfolioStore.getState();
        if (currentState.portfolio.experiences.length === 0) {
            addExperience();
        }
    }, [addExperience]);

    const handleSaveChanges = () => {
        try {
            portfolioSchema.parse(portfolio);

            setErrors({});
            toast("Perubahan berhasil disimpan", {
                icon: <SuccessIcon className="size-5" />,
            });
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.flatten().fieldErrors;
                setErrors(formattedErrors);
                const firstErrorMessage = error.issues[0]?.message;
                if (firstErrorMessage) {
                    toast.error(firstErrorMessage);
                } else {
                    toast.error("Terdapat kesalahan pada input Anda.");
                }
            }
        }
    };

    const activeExperience = activeModalId?.startsWith("exp-")
        ? portfolio.experiences.find((exp) => exp.id === activeModalId)
        : null;

    if (!hasMounted) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading Editor...</p>
            </div>
        );
    }

    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-x-[52px]">
                {/* Editor Form Section */}
                <div>
                    <div className="flex items-center justify-between mb-7">
                        <h2 className="text-2xl font-semibold">Editor</h2>
                        <Button variant="default" onClick={handleSaveChanges}>
                            Simpan Perubahan
                        </Button>
                    </div>
                    <div className="space-y-6">
                        <InputImageCard
                            title="Background Image"
                            imageFile={portfolio.images.background_image}
                            onImageChange={(file) =>
                                updateImage("background_image", file)
                            }
                            onOpenInDialog={() =>
                                openDialogFor("background_image")
                            }
                            error={errors.images?.background_image?.[0]}
                        />
                        <InputImageCard
                            title="Profile Image"
                            imageFile={portfolio.images.profile_image}
                            onImageChange={(file) =>
                                updateImage("profile_image", file)
                            }
                            onOpenInDialog={() =>
                                openDialogFor("profile_image")
                            }
                            error={errors.images?.profile_image?.[0]}
                        />
                        <ProfileCard
                            profile={portfolio.profile}
                            updateField={updateProfileField}
                            onOpenInDialog={() => openDialogFor("profile")}
                            errors={errors.profile}
                        />

                        <div>
                            {portfolio.experiences.map((experience, index) => (
                                <div key={experience.id} className="mb-6">
                                    <ExperienceCard
                                        experience={experience}
                                        index={index + 1}
                                        updateField={updateExperienceField}
                                        deleteExperience={deleteExperience}
                                        isDeletable={
                                            portfolio.experiences.length > 1
                                        }
                                        onOpenInDialog={() =>
                                            openDialogFor(experience.id)
                                        }
                                        errors={errors.experiences?.[index]}
                                    />
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                onClick={addExperience}
                                className="w-full cursor-pointer"
                                disabled={portfolio.experiences.length >= 10}
                            >
                                + Tambah Portofolio
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block h-auto w-px bg-foreground/20"></div>

                {/* Preview Section */}
                <div>
                    <PreviewCard title="Preview" />
                </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                </VisuallyHidden>
                <DialogContent className="md:max-w-4xl p-0 rounded-xl">
                    {/* Conditionally render the correct component based on the active ID */}
                    {activeModalId === "profile" && (
                        <ProfileCard
                            profile={portfolio.profile}
                            updateField={updateProfileField}
                            isInDialog
                        />
                    )}
                    {activeModalId === "background_image" && (
                        <InputImageCard
                            title="Background Image"
                            imageFile={portfolio.images.background_image}
                            onImageChange={(file) =>
                                updateImage("background_image", file)
                            }
                            isInDialog
                        />
                    )}
                    {activeModalId === "profile_image" && (
                        <InputImageCard
                            title="Profile Image"
                            imageFile={portfolio.images.profile_image}
                            onImageChange={(file) =>
                                updateImage("profile_image", file)
                            }
                            isInDialog
                        />
                    )}
                    {activeExperience && (
                        <ExperienceCard
                            experience={activeExperience}
                            index={
                                portfolio.experiences.findIndex(
                                    (exp) => exp.id === activeExperience.id
                                ) + 1
                            }
                            updateField={updateExperienceField}
                            deleteExperience={deleteExperience}
                            isDeletable={portfolio.experiences.length > 1}
                            isInDialog
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

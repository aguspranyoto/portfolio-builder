"use client";

import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/ui/form/ExperienceCard";
import InputImageCard from "@/components/ui/form/InputImageCard";
import ProfileCard from "@/components/ui/form/ProfileCard";
import { usePortfolioStore } from "@/stores/portfolioStore";
import PreviewCard from "@/components/PreviewCard";
import { toast } from "sonner";
import SuccessIcon from "@/components/icons/SuccessIcon";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

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
    const [dialogContent, setDialogContent] = useState<ReactNode>(null);
    const [dialogTitle, setDialogTitle] = useState("");

    const openInDialog = (content: ReactNode) => {
        setDialogContent(content);
        setDialogTitle(title);
        setIsDialogOpen(true);
    };

    useEffect(() => {
        setHasMounted(true);
        const currentState = usePortfolioStore.getState();
        if (currentState.portfolio.experiences.length === 0) {
            addExperience();
        }
    }, [addExperience]);

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
                        <Button
                            variant="default"
                            onClick={() => {
                                toast("Perubahan berhasil disimpan", {
                                    icon: <SuccessIcon className="size-5" />,
                                });
                            }}
                        >
                            Simpan Perubahan
                        </Button>
                    </div>
                    <div className="space-y-6">
                        <InputImageCard
                            title="Background Image"
                            imageUrl={portfolio.images.background_image}
                            onImageChange={(url) =>
                                updateImage("background_image", url)
                            }
                        />
                        <InputImageCard
                            title="Profile Image"
                            imageUrl={portfolio.images.profile_image}
                            onImageChange={(url) =>
                                updateImage("profile_image", url)
                            }
                        />
                        <ProfileCard
                            profile={portfolio.profile}
                            updateField={updateProfileField}
                            openInDialog={openInDialog}
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
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                    </DialogHeader>
                    {dialogContent}
                </DialogContent>
            </Dialog>
        </div>
    );
}

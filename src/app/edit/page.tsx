"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/ui/form/ExperienceCard";
import InputImageCard from "@/components/ui/form/InputImageCard";
import ProfileCard from "@/components/ui/form/ProfileCard";
import { usePortfolioStore } from "@/stores/portfolioStore";

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
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] lg:gap-x-[52px]">
                {/* Editor Form Section */}
                <div>
                    <div className="flex items-center justify-between mb-7">
                        <h2 className="text-2xl font-semibold">Editor</h2>
                        <Button
                            variant="default"
                            onClick={() => alert("Perubahan disimpan!")}
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
                                className="w-full"
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
                    <h2 className="text-2xl font-semibold mb-7">Preview</h2>
                    <div className="p-4 border rounded-md space-y-4">
                        <h3 className="text-lg font-bold">
                            {portfolio.profile.name || "Nama Anda"}
                        </h3>
                        <p>{portfolio.profile.job_title || "Jabatan Anda"}</p>
                        <p className="text-sm text-gray-600">
                            {portfolio.profile.job_description ||
                                "Deskripsi singkat Anda."}
                        </p>
                        <hr />
                        <h4 className="font-semibold mt-4">
                            Pengalaman Kerja:
                        </h4>
                        {portfolio.experiences.length > 0 ? (
                            portfolio.experiences.map((exp) => (
                                <div key={exp.id} className="p-2 border-t">
                                    <p className="font-bold">
                                        {exp.position || "Posisi"} di{" "}
                                        {exp.company || "Perusahaan"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {exp.start_date} - {exp.end_date}
                                    </p>
                                    <p className="text-sm mt-1">
                                        {exp.description}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">
                                Belum ada pengalaman kerja.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

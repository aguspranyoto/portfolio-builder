"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { usePortfolioStore } from "@/stores/portfolioStore";

const formatDisplayDate = (dateString: string, fallbackText: string) => {
    if (!dateString) return fallbackText;
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    } catch (error) {
        console.error(error);
        return fallbackText;
    }
};

export default function PreviewCard({ title }: { title: string }) {
    const { portfolio } = usePortfolioStore();

    return (
        <div className="font-[family-name:var(--font-inter)]">
            {title && (
                <div className="flex items-center justify-between mb-7">
                    <h2 className="text-2xl font-semibold">{title}</h2>
                </div>
            )}
            <Card className="overflow-hidden min-h-[800px] rounded-xl">
                <CardContent>
                    {/* Background Image */}
                    <div className="relative z-10 h-[240px] -mt-6 -mx-6">
                        {portfolio.images.background_image ? (
                            <Image
                                src={portfolio.images.background_image}
                                fill
                                alt="Background Image"
                                className="absolute inset-0 size-full object-cover"
                            />
                        ) : (
                            <div className="bg-gray-200 size-full"></div>
                        )}
                    </div>

                    {/* Profile Image */}
                    <div className="relative z-30 -mt-[110px] flex items-center justify-center mb-4">
                        <div className="shadow rounded-full overflow-hidden size-[160px] bg-gray-200 flex justify-center items-center">
                            {portfolio.images.profile_image ? (
                                <Image
                                    src={portfolio.images.profile_image}
                                    width={160}
                                    height={160}
                                    alt="Profile Image"
                                    className="size-full object-cover"
                                />
                            ) : (
                                <span className="text-xs text-gray-500">
                                    No Profile Image
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex flex-col justify-center items-center space-y-0.5 mb-4 text-center">
                        <h3 className="text-2xl font-bold">
                            {portfolio.profile.name || "Nama"}
                        </h3>
                        <p className="font-bold text-[#878787]">
                            {portfolio.profile.job_title || "Title"}
                        </p>
                        <p className="text-xs max-w-[300px] leading-5 text-[#878787]">
                            {portfolio.profile.job_description ||
                                "Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet "}
                        </p>
                    </div>

                    {/* Portfolio/Experience Section */}
                    <div>
                        <h2 className="font-semibold text-base mb-2">
                            Portfolio
                        </h2>
                        <div className="flex flex-col gap-4">
                            {portfolio.experiences.length > 0 ? (
                                portfolio.experiences.map((exp) => (
                                    <div
                                        key={exp.id}
                                        className="p-4 shadow rounded-lg space-y-1 border"
                                    >
                                        <p className="text-black font-medium">
                                            {exp.position || "Posisi"}
                                        </p>
                                        <p className="text-xs font-medium text-[#717984]">
                                            {exp.company || "Perusahaan"}
                                        </p>
                                        <p className="text-xs text-[#717984] mb-1">
                                            {formatDisplayDate(
                                                exp.start_date,
                                                "Tanggal Mulai"
                                            )}{" "}
                                            -{" "}
                                            {formatDisplayDate(
                                                exp.end_date,
                                                "Tanggal Selesai"
                                            )}
                                        </p>
                                        <p className="text-xs">
                                            {exp.description || "Deskripsi"}
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
                </CardContent>
            </Card>
        </div>
    );
}

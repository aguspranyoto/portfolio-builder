import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function PreviewCard({ portfolio, title }: any) {
    return (
        <div className="font-[family-name:var(--font-inter)]">
            {title && (
                <div className="flex items-center justify-between mb-7">
                    <h2 className="text-2xl font-semibold">{title}</h2>
                </div>
            )}
            <Card className="overflow-hidden min-h-[1180px]">
                <CardContent>
                    <div className="relative z-10 h-[240px] -mt-6 -mx-6">
                        <Image
                            src={
                                "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000"
                            }
                            fill
                            alt="Background Image"
                            className="absolute inset-0 size-full object-cover"
                        />
                    </div>
                    <div className="relative z-30 -mt-[110px] flex items-center justify-center mb-4">
                        <div className=" rounded-full overflow-hidden size-[160px]">
                            <Image
                                src={
                                    "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000"
                                }
                                width={160}
                                height={160}
                                alt="Background Image"
                                className=" size-full object-cover"
                            />
                        </div>
                    </div>
                    <div className=" flex flex-col justify-center items-center space-y-0.5 mb-4">
                        <h3 className="text-2xl font-bold">
                            {portfolio.profile.name || "Nama"}
                        </h3>
                        <p className="font-bold text-[#878787]">
                            {portfolio.profile.job_title || "Title"}
                        </p>
                        <p className="text-xs text-center max-w-[300px] leading-5 text-[#878787]">
                            {portfolio.profile.job_description ||
                                "Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                        </p>
                    </div>
                    <div>
                        <h2 className="font-semibold text-base mb-2">
                            Portfolio
                        </h2>
                        <div className="flex flex-col gap-4 md:gap-8">
                            {portfolio.experiences.length > 0 ? (
                                portfolio.experiences.map((exp) => (
                                    <div
                                        key={exp.id}
                                        className="px-7 pt-3 pb-7 shadow space-y-1"
                                    >
                                        <p className="text-black font-medium">
                                            {exp.position || "Posisi"}
                                        </p>
                                        <p className="text-xs font-medium text-[#717984]">
                                            {exp.company || "Perusahaan"}
                                        </p>
                                        <p className="text-xs text-[#717984] mb-1">
                                            {exp.start_date || "start date"} -{" "}
                                            {exp.end_date || "end date"}
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

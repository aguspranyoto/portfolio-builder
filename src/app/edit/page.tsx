import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/ui/form/ExperienceCard";
import InputImageCard from "@/components/ui/form/InputImageCard";
import ProfileCard from "@/components/ui/form/ProfileCard";

export default function Home() {
    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] lg:gap-x-[52px]">
                {/* form */}
                <div>
                    <div className="flex items-center justify-between mb-7">
                        <h2 className="text-2xl font-semibold">Editor</h2>
                        <Button variant="default">Simpan Perubahan</Button>
                    </div>
                    <div className="space-y-6">
                        {/* field background image */}
                        <div>
                            <InputImageCard title="Background Image" />
                        </div>

                        {/* field Profile image */}
                        <div>
                            <InputImageCard title="Profile Image" />
                        </div>

                        {/* field profile */}
                        <div>
                            <ProfileCard />
                        </div>

                        {/* field experience */}
                        <div>
                            <ExperienceCard />
                        </div>
                    </div>
                </div>

                {/* divider */}
                <div className="hidden lg:block h-auto w-px bg-foreground dark:bg-background">
                    &nbsp;
                </div>

                {/* preview */}
                <div>
                    <div>
                        <h2 className="text-2xl font-semibold  mb-7">
                            Preview
                        </h2>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

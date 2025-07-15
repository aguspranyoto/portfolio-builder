"use client";

import PreviewCard from "@/components/PreviewCard";
import { usePortfolioStore } from "@/stores/portfolioStore";

export default function Home() {
    const { portfolio } = usePortfolioStore();
    return (
        <div className="font-[family-name:var(--font-geist-sans)] max-w-[655px] mx-auto">
            <PreviewCard portfolio={portfolio} />
        </div>
    );
}

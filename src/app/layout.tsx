import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pressStart2P = Press_Start_2P({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-press-start-2p",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Portfolio Builder",
    description: "Build your portfolio easily",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} antialiased`}
            >
                <div className="bg-background dark:bg-foreground text-primary dark:text-primary-foreground font-[family-name:var(--font-geist-sans)]">
                    <Header />
                    <main className="custom-container py-5">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}

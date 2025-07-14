"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
    const pathname = usePathname();

    const navLinks: { label: string; href: string }[] = [
        {
            label: "View",
            href: "/",
        },
        {
            label: "Edit",
            href: "/edit",
        },
    ];
    return (
        <header className="border-b">
            <div className="custom-container flex items-center justify-between">
                <div className="py-5">
                    <h1 className="text-xs font-semibold font-press-start-2p">
                        PORTFOLIO BUILDER
                    </h1>
                </div>
                <nav className="">
                    <ul className="flex items-center ">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li className="" key={link.label}>
                                    <Link
                                        href={link.href}
                                        className={clsx(
                                            "transition-colors hover:text-foreground/65 py-5 px-3",
                                            {
                                                "font-semibold": isActive,
                                            }
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

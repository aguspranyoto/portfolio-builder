import Link from "next/link";
import React from "react";
import ViewIcon from "./icons/ViewIcon";
import EditIcon from "./icons/EditIcon";

export default function MobileBottomNav() {
    const navLinks: {
        label: string;
        href: string;
        icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }[] = [
        {
            label: "View",
            href: "/",
            icon: ViewIcon,
        },
        {
            label: "Edit",
            href: "/edit",
            icon: EditIcon,
        },
    ];
    return (
        <div className="md:hidden fixed bottom-0 w-full z-[9999]">
            <nav className="bg-white shadow border-t h-20">
                <ul className="size-full flex justify-evenly items-center">
                    {navLinks.map((link) => {
                        return (
                            <li key={link.label} className="">
                                <Link
                                    href={link.href}
                                    className="flex flex-col justify-center items-center"
                                >
                                    <div className="size-8 mb-0.5">
                                        {link.icon && (
                                            <link.icon className="size-full" />
                                        )}
                                    </div>
                                    <span className="text-sm">
                                        {link.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

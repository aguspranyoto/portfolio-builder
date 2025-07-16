import React from "react";

export default function Footer() {
    return (
        <footer className="border-t mb-[80px] md:mb-0">
            <div className="custom-container py-5 text-center text-sm">
                Copyright © {new Date().getFullYear()} Agus Pranyoto. All Rights
                Reserved.
            </div>
        </footer>
    );
}

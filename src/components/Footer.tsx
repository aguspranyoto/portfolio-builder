import React from "react";

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="custom-container py-5 text-center text-sm">
                Copyright © {new Date().getFullYear()} Agus Pranyoto. All Rights
                Reserved.
            </div>
        </footer>
    );
}

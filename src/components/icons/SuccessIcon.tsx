import React from "react";
import { CSSProperties } from "react";

const circleStyle: CSSProperties = {
    fill: "#25AE88",
};

const polylineStyle: CSSProperties = {
    fill: "none",
    stroke: "#FFFFFF",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: 10,
};

export default function SuccessIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            {...props}
        >
            <circle style={circleStyle} cx="25" cy="25" r="25" />
            <polyline style={polylineStyle} points="38,15 22,33 12,25" />
        </svg>
    );
}

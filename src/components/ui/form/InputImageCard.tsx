import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../input";
import Image from "next/image";

type InputImageCardProps = {
    title: string;
    imageUrl: string;
    onImageChange: (url: string) => void;
};

export default function InputImageCard({
    title,
    imageUrl,
    onImageChange,
}: InputImageCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="underline">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-sm text-gray-500">Enter image URL:</p>
                <Input
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => onImageChange(e.target.value)}
                />
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={title}
                        className="mt-2 rounded-md max-h-48 w-full object-cover"
                    />
                )}
            </CardContent>
        </Card>
    );
}

"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined): string {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function isValidDate(date: Date | undefined): boolean {
    return date instanceof Date && !isNaN(date.getTime());
}

type CustomDatePickerProps = {
    title: string;
    date: Date | undefined;
    onDateChange: (date: Date | undefined) => void;
};

export default function CustomDatePicker({
    title,
    date,
    onDateChange,
}: CustomDatePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [month, setMonth] = React.useState<Date | undefined>(date);
    const [inputValue, setInputValue] = React.useState(formatDate(date));

    React.useEffect(() => {
        setInputValue(formatDate(date));
        setMonth(date);
    }, [date]);

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label htmlFor={title} className="px-1">
                {title}
            </Label>
            <div className="relative flex gap-2">
                <Input
                    id={title}
                    value={inputValue}
                    placeholder="Select a date"
                    className="bg-background pr-10"
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        const newDate = new Date(e.target.value);
                        if (isValidDate(newDate)) {
                            onDateChange(newDate);
                        } else {
                            onDateChange(undefined);
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(newDate) => {
                                onDateChange(newDate);
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

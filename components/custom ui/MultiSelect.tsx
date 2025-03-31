"use client";
import { useState } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, } from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
    placeholder: string;
    categories: CategoryType[];
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ placeholder, categories, value, onChange, onRemove }) => {
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    let selected: CategoryType[];

    if (value.length === 0) {
        selected = [];
    } else {
        selected = value.map((id) => categories.find((category) => category._id === id)) as CategoryType[];
    }

    const selectables = categories.filter((category) => !selected.includes(category));

    return (
        <Command className="overflow-visible bg-white">
            <div className="border rounded-md">
                <div className="flex gap-1 flex-wrap">
                    {selected.map((item) => (
                        <Badge key={item._id}>
                            {item.name}
                            <button onClick={() => onRemove(item._id)} className="cursor-pointer ml-1 hover:text-[var(--color-powder-pink)]">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
                <CommandInput
                    placeholder={placeholder}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                />
            </div>
            <div className="mt-2 relative">
                {open && (
                    <CommandGroup className="absolute w-full z-1 top-0 overflow-auto border rounded-md shadow-md bg-white">
                        {selectables.map((category) => (
                            <CommandItem
                                key={category._id}
                                onMouseDown={(e) => e.preventDefault()}
                                onSelect={() => {
                                    onChange(category._id);
                                    setInputValue('');
                                }}
                                className="hover:bg-[var(--color-light-beige)] hover:text-white cursor-pointer"
                            >
                                {category.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </div>
        </Command>
    )
}

export default MultiSelect;
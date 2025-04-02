"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface MultiTextProps {
    placeholder: string;
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({ placeholder, value, onChange, onRemove }) => {
    const [inputValue, setInputValue] = useState('');

    const addValue = (value: string) => {
        onChange(value);
        setInputValue('');
    }

    return (
        <>
            <Input
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        addValue(inputValue);
                    }
                }}
            />
            <div className="flex gap-1 flex-wrap mt-4">
                {value.map((item, i) => (
                    <Badge key={i} className="bg-[var(--color-light-beige)] text-white" >
                        {item}
                        <button type="button" onClick={() => onRemove(item)} className="ml-1 rounded-full outline-none hover:bg-[var(--color-powder-pink)]" >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
        </>
    )
}

export default MultiText;
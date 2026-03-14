"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useDebounce } from "@/shared/hooks/use-debounce";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface AsyncSelectProps {
  value: string | number | null;
  onChange: (selectedOption: string | number | null) => void;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  onClear?: () => void;
}

const AsyncSelect: React.FC<AsyncSelectProps> = ({
  value,
  onChange,
  placeholder = "",
  options,
  disabled = false,
  onClear,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedInputValue = useDebounce(inputValue, 200);

  const filteredOptions = useMemo(() => {
    if (!debouncedInputValue) {
      return options;
    }
    return options?.filter((item) =>
      item.label.toLowerCase().includes(debouncedInputValue.toLowerCase()),
    );
  }, [options, debouncedInputValue]);

  const selectedOptionLabel = useMemo(() => {
    if (value === null || value === undefined) return "";
    const selected = options.find((opt) => opt.value === value);
    return selected ? selected.label : "";
  }, [value, options]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelectOption = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setInputValue(selectedOptionLabel);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <input
          disabled={disabled}
          type="text"
          value={isOpen ? inputValue : selectedOptionLabel}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={cn(
            "w-full px-4 py-2 pr-10 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            disabled ? "bg-grey-20" : "bg-white",
            !!onClear && "pr-16",
          )}
        />

        {onClear && (
          <button
            disabled={disabled}
            type="button"
            className={cn(
              "group absolute inset-y-0 right-8 flex items-center px-2 cursor-pointer",
              disabled && "cursor-default!",
            )}
            onClick={() => {
              setIsOpen(false);
              setInputValue("");
              onClear();
            }}
          >
            <X className="w-4 text-grey-50 group-hover:text-grey-70" />
          </button>
        )}

        <button
          disabled={disabled}
          type="button"
          className={cn(
            "group absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 cursor-pointer",
            disabled && "cursor-default!",
          )}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {React.createElement(
            isOpen ? ChevronUp : ChevronDown,
            { className: "w-4 text-grey-50 group-hover:text-grey-70" }
          )}
        </button>
      </div>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-200 rounded-lg shadow-xl max-h-60">
          {filteredOptions?.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelectOption(option)}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-grey-30"
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">
              {inputValue
                ? "Tidak ada hasil ditemukan"
                : "Tidak ada opsi tersedia"}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AsyncSelect;

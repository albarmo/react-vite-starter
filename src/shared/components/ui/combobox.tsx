"use client";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { cn } from "@/shared/lib/cn";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

export interface ComboboxOption {
  label: string;
  value: number;
}

interface ComboboxProps {
  value: number | null;
  displayValue?: string;
  onSelect: (value: number | null) => void;
  placeholder?: string;
  options: ComboboxOption[];
  disabled?: boolean;
  onClear?: () => void;
  allowCustomValue?: boolean;
  onCustomValue?: (customValue: string) => void;
}

export const Combobox: React.FC<ComboboxProps> = ({
  value,
  displayValue,
  onSelect,
  placeholder = "",
  options,
  disabled = false,
  onClear,
  allowCustomValue = false,
  onCustomValue,
}) => {
  const [inputValue, setInputValue] = useState(displayValue || "");
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

  const syncedInputValue = displayValue || selectedOptionLabel;

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

  const handleComboboxOption = (option: ComboboxOption) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setInputValue(syncedInputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (allowCustomValue && inputValue.trim()) {
        // Check if the input matches any existing option
        const matchingOption = filteredOptions.find(
          (option) => option.label.toLowerCase() === inputValue.toLowerCase(),
        );

        if (matchingOption) {
          // If it matches an existing option, select it
          handleComboboxOption(matchingOption);
        } else {
          // If it's a new value and custom values are allowed
          setIsOpen(false);
          if (onCustomValue) {
            onCustomValue(inputValue.trim());
          }
        }
      } else if (filteredOptions.length > 0) {
        // If custom values are not allowed, select the first filtered option
        handleComboboxOption(filteredOptions[0]);
      }
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <input
          disabled={disabled}
          type="text"
          value={isOpen ? inputValue : displayValue || selectedOptionLabel}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "focus:ring-blue-500 w-full rounded-lg border bg-white px-4 py-2 pr-10 focus:ring-2 focus:outline-none",
            disabled ? "cursor-not-allowed bg-grey-20" : "bg-white",
            !!onClear && "pr-16",
          )}
        />

        {onClear && (
          <button
            disabled={disabled}
            type="button"
            className={cn(
              "group absolute inset-y-0 right-8 flex cursor-pointer items-center px-2",
              disabled && "cursor-not-allowed",
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
            "group text-gray-400 absolute inset-y-0 right-0 flex cursor-pointer items-center px-2",
            disabled && "cursor-not-allowed",
          )}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
              return;
            }

            setInputValue(syncedInputValue);
            setIsOpen(true);
          }}
        >
          {React.createElement(isOpen ? ChevronUp : ChevronDown, {
            className: "w-4 text-grey-50 group-hover:text-grey-70",
          })}
        </button>
      </div>

      {isOpen && (
        <ul className="border-gray-200 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white shadow-xl">
          {filteredOptions?.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleComboboxOption(option)}
                className="text-gray-700 cursor-pointer px-4 py-2 hover:bg-grey-30"
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="text-gray-500 px-4 py-2">
              {allowCustomValue && inputValue.trim() ? (
                <span
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    if (onCustomValue) {
                      onCustomValue(inputValue.trim());
                    }
                  }}
                >
                  Pilih &quot;{inputValue.trim()}&quot;
                </span>
              ) : inputValue ? (
                "Tidak ada hasil ditemukan"
              ) : (
                "Tidak ada opsi tersedia"
              )}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

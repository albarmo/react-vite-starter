"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";
import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

interface Option {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value?: Array<string | number>;
  onChange?: (selectedValues: Array<string | number>) => void;
  placeholder?: string;
  className?: string;
  dropdownClassName?: string;
  disabled?: boolean;
  search?: string;
  onSearchChange?: (search: string) => void;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder,
  className,
  dropdownClassName,
  disabled,
  search,
  onSearchChange,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const commandContainerRef = React.useRef<HTMLDivElement>(null);

  const effectiveSearch = search ?? searchQuery;

  const focusSearchInput = React.useCallback(() => {
    commandContainerRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, []);

  const filteredOptions = React.useMemo(() => {
    if (!effectiveSearch) {
      return options;
    }
    return options?.filter((option) =>
      option.label.toLowerCase().includes(effectiveSearch.toLowerCase()),
    );
  }, [effectiveSearch, options]);

  const selectedOptions = React.useMemo(() => {
    const selectedValues = new Set(value);
    return options.filter((option) => selectedValues.has(option.value));
  }, [options, value]);

  const handleSelect = (optionValue: string | number) => {
    const newSelectedValues = new Set(value);
    if (newSelectedValues.has(optionValue)) {
      newSelectedValues.delete(optionValue);
    } else {
      newSelectedValues.add(optionValue);
    }
    onChange?.(Array.from(newSelectedValues));
    focusSearchInput();
  };

  const handleSelectAll = () => {
    if (!onChange) return;
    const allVisibleValues = filteredOptions.map((option) => option.value);
    const newSelectedValues = new Set([...value, ...allVisibleValues]);
    onChange(Array.from(newSelectedValues));
    focusSearchInput();
  };

  const handleRemove = (optionValue: string | number) => {
    const newSelectedValues = new Set(value);
    newSelectedValues.delete(optionValue);
    onChange?.(Array.from(newSelectedValues));
    focusSearchInput();
  };

  const handleClear = () => {
    onChange?.([]);
    focusSearchInput();
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-auto min-h-10 w-full justify-between overflow-hidden relative",
            "flex items-center gap-2 px-3 py-2 text-left text-sm",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-2 max-w-8/10">
            {selectedOptions.length > 0 ? (
              <>
                {selectedOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant="secondary"
                    className="flex justify-end whitespace-normal text-wrap max-w-full rounded-sm pr-1 text-sm bg-blue-20 font-medium text-blue-70"
                  >
                    <span>{option.label}</span>
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(option.value);
                      }}
                      className="cursor-pointer ml-1 h-4 w-4 grid place-items-center rounded-full text-blue-90 hover:bg-blue-90 hover:text-blue-20"
                    >
                      <X />
                    </span>
                  </Badge>
                ))}
                <span className="flex-1 min-w-[50px]"></span>
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <div className="flex">
              <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="cursor-pointer ml-1 h-4 w-4 grid place-items-center rounded-full text-foreground hover:bg-blue-90 hover:text-blue-20"
            >
              <X />
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[--radix-popover-trigger-width] p-0",
          dropdownClassName,
        )}
      >
        <div ref={commandContainerRef}>
          <Command>
          <CommandInput
            value={effectiveSearch}
            onValueChange={(nextValue: string) => {
              setSearchQuery(nextValue);
              onSearchChange?.(nextValue);
            }}
          />

          {effectiveSearch && filteredOptions.length > 1 && (
            <div className="p-1">
              <button
                type="button"
                onClick={handleSelectAll}
                className="hover:bg-[#F5F5F5] w-full cursor-pointer data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                <Check className={cn("mr-2 h-4 w-4", "opacity-0")} />
                Pilih semua hasil pencarian
              </button>
            </div>
          )}

          <CommandList>
            <CommandEmpty>Belum ada data.</CommandEmpty>
            <CommandGroup>
              {filteredOptions?.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={String(option.label)}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {value.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClear}
                    className="justify-center text-center"
                  >
                    Hapus ({value.length})
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
}

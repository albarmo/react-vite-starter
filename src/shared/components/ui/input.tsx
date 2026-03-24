"use client";

import * as React from "react";

import { cn } from "@/shared/lib/cn";

interface InputProps extends React.ComponentProps<"input"> {
  width?: "auto" | "short" | "medium" | "full";
  suffix?: React.ReactNode;
}

const INPUT_WIDTH = {
  auto: "w-auto min-w-0 max-w-full",
  short: "w-24 min-w-[4rem] max-w-[6rem]",
  medium: "w-48 min-w-[8rem] max-w-[16rem]",
  full: "w-full min-w-0 max-w-full",
};

const NAVIGATION_KEYS = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Backspace",
  "Delete",
  "Enter",
  "Escape",
  "Home",
  "End",
  "Tab",
]);

function shouldRestrictByInputMode(
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"],
) {
  return inputMode === "numeric" || inputMode === "decimal";
}

function getPatternByInputMode(
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"],
) {
  if (inputMode === "numeric") return "[0-9]*";
  if (inputMode === "decimal") return "[0-9]*[.,]?[0-9]*";
  return undefined;
}

function isValidCharacterByInputMode(
  key: string,
  inputMode: React.HTMLAttributes<HTMLInputElement>["inputMode"],
  value: string,
  selectionStart: number | null,
  selectionEnd: number | null,
) {
  if (/^\d$/.test(key)) return true;
  if (inputMode !== "decimal" || ![".", ","].includes(key)) return false;

  const start = selectionStart ?? value.length;
  const end = selectionEnd ?? value.length;
  const nextValue = value.slice(0, start) + key + value.slice(end);

  return /^\d*[.,]?\d*$/.test(nextValue);
}

function isValidPasteByInputMode(
  value: string,
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"],
) {
  if (inputMode === "numeric") return /^\d*$/.test(value);
  if (inputMode === "decimal") return /^\d*[.,]?\d*$/.test(value);
  return true;
}

function Input({
  className,
  type,
  suffix,
  width = "auto",
  inputMode,
  pattern,
  onKeyDown,
  onPaste,
  ...props
}: InputProps) {
  const resolvedPattern = pattern ?? getPatternByInputMode(inputMode);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !shouldRestrictByInputMode(inputMode)) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (NAVIGATION_KEYS.has(event.key)) return;

    if (
      isValidCharacterByInputMode(
        event.key,
        inputMode,
        event.currentTarget.value,
        event.currentTarget.selectionStart,
        event.currentTarget.selectionEnd,
      )
    ) {
      return;
    }

    event.preventDefault();
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(event);
    if (event.defaultPrevented || !shouldRestrictByInputMode(inputMode)) return;

    const pastedValue = event.clipboardData.getData("text");
    if (isValidPasteByInputMode(pastedValue, inputMode)) return;

    event.preventDefault();
  };

  return (
    <div
      className={cn(
        "relative flex w-auto max-w-full min-w-0 md:flex-none",
        INPUT_WIDTH[width],
      )}
    >
      <input
        type={type}
        inputMode={inputMode}
        pattern={resolvedPattern}
        data-slot="input"
        className={cn(
          "flex h-10.5 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 pr-5 text-base transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:bg-grey-20 dark:bg-input/30",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className,
        )}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        {...props}
      />
      {suffix && (
        <div className="text-gray-500 absolute top-0 right-0 flex h-full shrink-0 items-center justify-center self-center rounded-r-md border bg-muted px-3">
          {suffix}
        </div>
      )}
    </div>
  );
}

export { Input };

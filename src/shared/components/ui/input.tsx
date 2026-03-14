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

function Input({
  className,
  type,
  suffix,
  width = "auto",
  ...props
}: InputProps) {
  return (
    <div
      className={cn(
        "flex md:flex-none relative w-auto min-w-0 max-w-full",
        INPUT_WIDTH[width],
      )}
    >
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10.5 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pr-5 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:bg-grey-20",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
      {suffix && (
        <div className="absolute right-0 top-0 border flex h-full flex-shrink-0 items-center justify-center self-center rounded-r-md bg-muted px-3 text-gray-500">
          {suffix}
        </div>
      )}
    </div>
  );
}

export { Input };

"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/cn";
import { SpinnerIcon } from "../common/spinner-icon";
import { buttonVariants } from "./button-variants";

const loadingVariants = cva("relative transition-all opacity-100!", {
  variants: {
    variant: {
      default: "bg-primary/50",
      destructive: "bg-destructive/50",
      outline: "bg-background/50",
      secondary: "bg-secondary/50",
      ghost: "",
      link: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Button({
  className,
  variant,
  size,
  children,
  asChild = false,
  loading = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && loadingVariants({ variant }),
        )}
        {...props}
        aria-busy={loading || undefined}
        disabled={loading || props.disabled}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        loading && loadingVariants({ variant }),
      )}
      {...props}
      disabled={loading || props.disabled}
    >
      {loading ? <span className="inline-block w-14" /> : children}
      {loading ? (
        <SpinnerIcon className="absolute top-1/2 left-1/2 -translate-1/2 animate-spin opacity-100" />
      ) : null}
    </button>
  );
}

export { Button };

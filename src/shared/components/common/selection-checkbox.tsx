"use client";

import { Checkbox } from "@/shared/components/ui/checkbox";

type SelectionCheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  onCheckedChange: (checked: boolean) => void;
  ariaLabel: string;
};

export function SelectionCheckbox({
  checked,
  indeterminate = false,
  onCheckedChange,
  ariaLabel,
}: SelectionCheckboxProps) {
  return (
    <Checkbox
      checked={indeterminate ? "indeterminate" : checked}
      onCheckedChange={(value) => onCheckedChange(value === true)}
      aria-label={ariaLabel}
      className="size-3.5 rounded border-grey-80 data-[state=checked]:border-blue-50 data-[state=checked]:bg-blue-50"
    />
  );
}

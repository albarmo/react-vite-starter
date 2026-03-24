"use client";

import { cn } from "@/shared/lib/cn";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import IconLeft from "/icons/direction-left.svg";
import IconRight from "/icons/direction-right.svg";

export type PaginationProps = {
  disabled?: boolean;
  currentPage?: number;
  perPage?: number;
  from?: number;
  to?: number;
  total?: number;
  lastPage?: number;
  onChange?: (value: { currentPage?: number; perPage?: number }) => void;
  showPageSizeSelect?: boolean;
};

export function Pagination({
  disabled = false,
  currentPage = 1,
  perPage = 10,
  from,
  to,
  total,
  lastPage = 0,
  onChange,
  showPageSizeSelect = true,
}: PaginationProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 md:flex-row",
        showPageSizeSelect ? "justify-between" : "justify-end",
      )}
    >
      {showPageSizeSelect && (
        <div className="flex items-center gap-2">
          <span className="text-base">Menampilkan: </span>
          <Select
            disabled={disabled}
            value={String(perPage)}
            onValueChange={(value) => {
              onChange?.({
                currentPage: 1,
                perPage: Number(value),
              });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-2 text-base">
        {from !== undefined && to !== undefined && (
          <span className="w-max">
            {from} - {to}
          </span>
        )}
        {total !== undefined && <span>dari {total}</span>}
        <div className="flex items-center">
          <Button
            disabled={disabled || currentPage <= 1}
            variant="ghost"
            onClick={() => {
              onChange?.({
                currentPage: currentPage - 1,
                perPage,
              });
            }}
          >
            <IconLeft />
          </Button>
          <Button
            disabled={disabled || currentPage >= (lastPage ?? Infinity)}
            variant="ghost"
            onClick={() => {
              onChange?.({
                currentPage: currentPage + 1,
                perPage,
              });
            }}
          >
            <IconRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

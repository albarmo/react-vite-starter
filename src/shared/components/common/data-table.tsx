"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/shared/lib/cn";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

type DataTableColumnMeta = {
  headClassName?: string;
  cellClassName?: string;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (data: TData) => void;
  className?: React.ComponentProps<"div">["className"];
  emptyMessage?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  className,
  emptyMessage = "Belum ada data.",
}: DataTableProps<TData, TValue>) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const tableRef = React.useRef<HTMLTableElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  React.useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      const table = tableRef.current;

      if (container && table) {
        setIsOverflowing(table.scrollWidth > container.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [data]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnPinning: true,
    initialState: {
      columnPinning: {
        right: ["actions"],
      },
    },
  });

  return (
    <div ref={containerRef} className={className}>
      <Table ref={tableRef} className="w-max min-w-full mb-2">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isPinnedLeft = header.column.getIsPinned() === "left";
                const isPinnedRight = header.column.getIsPinned() === "right";
                const leftOffset = isPinnedLeft
                  ? header.column.getStart("left")
                  : 0;
                const rightOffset = isPinnedRight
                  ? header.column.getStart("right")
                  : 0;
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "text-sm font-medium",
                      (header.column.columnDef.meta as DataTableColumnMeta | undefined)
                        ?.headClassName,
                      (isPinnedLeft || isPinnedRight) &&
                        "sticky z-20 bg-neutral-200",
                      isOverflowing && isPinnedRight && "pinned-right",
                    )}
                    style={{
                      left: isPinnedLeft ? `${leftOffset}px` : undefined,
                      right: isPinnedRight ? `${rightOffset}px` : undefined,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onRowClick?.(row.original)}
                className={onRowClick ? "cursor-pointer" : ""}
              >
                {row.getVisibleCells().map((cell) => {
                  const isPinnedLeft = cell.column.getIsPinned() === "left";
                  const isPinnedRight = cell.column.getIsPinned() === "right";
                  const leftOffset = isPinnedLeft
                    ? cell.column.getStart("left")
                    : 0;
                  const rightOffset = isPinnedRight
                    ? cell.column.getStart("right")
                    : 0;

                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "max-w-125 whitespace-normal",
                        "text-wrap wrap-break-word",
                        (cell.column.columnDef.meta as DataTableColumnMeta | undefined)
                          ?.cellClassName,
                        (isPinnedLeft || isPinnedRight) &&
                          "sticky bg-white z-10",
                        isOverflowing && isPinnedRight && "pinned-right",
                      )}
                      style={{
                        left: isPinnedLeft ? `${leftOffset}px` : undefined,
                        right: isPinnedRight ? `${rightOffset}px` : undefined,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        
      </Table>
    </div>
  );
}

import Image from "next/image";

const sortIcon = {
  asc: "/sort-asc.svg",
  desc: "/sort-desc.svg",
  default: "/sort.svg",
};
interface SortableHeaderProps {
  title: string;
  columnId: string;
  sorts: { column: string; sort: "asc" | "desc" | "" }[];
  onSort: (columnId: string) => void;
}

export const SortableHeader = ({
  title,
  columnId,
  sorts,
  onSort,
}: SortableHeaderProps) => {
  const currentSort = sorts.find((s) => s.column === columnId);
  const sortOrder = currentSort ? currentSort.sort : ""; // '' jika tidak di-sort

  let icon = sortIcon.default;
  if (!!currentSort && (sortOrder === "asc" || sortOrder === "desc")) {
    icon = sortIcon[sortOrder];
  }

  return (
    <button
      className="flex items-center justify-between w-full cursor-pointer"
      onClick={() => onSort(columnId)}
    >
      <span>{title}</span>
      <Image src={icon} alt="Sort Icon" width={16} height={16} />
    </button>
  );
};

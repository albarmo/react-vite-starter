import type {
  BookRequestRecord,
  BookRequestStatus,
} from "@/features/bibliographic/types/book-request.types";

const MEMBER_NAMES = [
  "Alda",
  "Bagas",
  "Citra",
  "Dewi",
  "Evan",
  "Farah",
  "Gilang",
  "Hani",
  "Intan",
  "Johan",
];

const BOOK_SEEDS = [
  {
    title: "Rich Dad Poor Dad (2025)",
    author: "Robert T. Kiyosaki",
    isbn: "9786020333175",
  },
  {
    title: "The Let Them Theory",
    author: "Mel Robbins",
    isbn: "625221049",
  },
  {
    title: "Start with Why",
    author: "Simon Sinek",
    isbn: "9786020628837",
  },
  {
    title: "The Art of Spending Money",
    author: "Morgan Housel",
    isbn: "9786238371563",
  },
  {
    title: "Why the Rich are Getting Richer",
    author: "Robert T. Kiyosaki",
    isbn: "9786020381077",
  },
  {
    title: "Bacalah Saat Hatimu Sedih",
    author: "Ahmad Rifai Rifan",
    isbn: "9786230022104",
  },
  {
    title: "Perintis Fantastis Bukan Pewaris",
    author: "Byzka Wibisono",
    isbn: "9786342530160",
  },
  {
    title: "Gaji UMR Bisa Kok Bertahan Hidup!",
    author: "Fajar Sidiq",
    isbn: "9786230072888",
  },
  {
    title: "The Principles of Money",
    author: "Andrew Carnegie",
    isbn: "9786235153667",
  },
  {
    title: "Untunku yang Mau Mengelola Uang",
    author: "Bbyeonggeul",
    isbn: "9786020531885",
  },
];

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getGeneratedStatus(index: number): BookRequestStatus {
  if (index === 0) return "pending";
  if (index % 13 === 0) return "rejected";
  if (index % 9 === 0) return "approved";
  return "pending";
}

function formatRequestDate(index: number) {
  const day = String((index % 28) + 1).padStart(2, "0");
  const month = MONTH_LABELS[(Math.floor(index / 28) + 2) % MONTH_LABELS.length];
  return `${day} ${month} 2026`;
}

function buildGeneratedRecord(index: number): BookRequestRecord {
  const seed = BOOK_SEEDS[index % BOOK_SEEDS.length];
  const name = MEMBER_NAMES[index % MEMBER_NAMES.length];
  const status = getGeneratedStatus(index);

  return {
    id: `book-request-${index + 1}`,
    memberId: String(123 + index),
    name,
    title: seed.title,
    requestDate: formatRequestDate(index),
    status,
    author: seed.author,
    isbn: seed.isbn,
    reason:
      status === "rejected"
        ? "Koleksi tidak sesuai kebutuhan pengadaan."
        : "-",
  };
}

export const BOOK_REQUEST_PRESET_RECORDS: BookRequestRecord[] = Array.from(
  { length: 1000 },
  (_, index) => buildGeneratedRecord(index),
);

BOOK_REQUEST_PRESET_RECORDS[0] = {
  id: "book-request-1",
  memberId: "123",
  name: "Alda",
  title: "Rich Dad Poor Dad (2025)",
  requestDate: "03 Mar 2026",
  status: "pending",
  author: "Robert T. Kiyosaki",
  isbn: "9786020333175",
  reason: "-",
};

export function getBookRequestRecordById(id: string) {
  return (
    BOOK_REQUEST_PRESET_RECORDS.find((record) => record.id === id) ??
    BOOK_REQUEST_PRESET_RECORDS[0]
  );
}

export function getBookRequestStatusLabel(status: BookRequestStatus) {
  switch (status) {
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "pending":
    default:
      return "Pending";
  }
}

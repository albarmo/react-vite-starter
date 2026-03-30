import type { CSSProperties } from "react";

export type BibliographicBook = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  copies: number;
  updatedAt: string;
  coverTitle: string;
  coverAccent: string;
  coverStyle: CSSProperties;
};

export type DeleteTarget =
  | {
      type: "single";
      book: BibliographicBook;
    }
  | {
      type: "selected";
      ids: string[];
    };

export type BibliographicToolbarProps = {
  search: string;
  selectedCount: number;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onOpenExportModal: () => void;
  onOpenImportModal: () => void;
  onDeleteSelected: () => void;
};

export type BibliographicFooterProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  from: number;
  to: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageSizeChange: (value: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export type BibliographicSelectionBarProps = {
  selectedCount: number;
  sidebarOpen: boolean;
  onDeleteSelected: () => void;
};

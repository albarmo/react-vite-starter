export type BibliographicItem = {
  id: string;
  bookId: string;
  itemCode: string;
  title: string;
  author: string;
  collectionType: string;
  location: string;
  callNumber: string;
  updatedAt: string;
};

export type ItemToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onOpenExportModal: () => void;
  onOpenImportModal: () => void;
};

export type ItemFooterProps = {
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

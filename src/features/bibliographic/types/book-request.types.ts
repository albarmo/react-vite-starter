export type BookRequestStatus = "pending" | "approved" | "rejected";

export type BookRequestRecord = {
  id: string;
  memberId: string;
  name: string;
  title: string;
  requestDate: string;
  status: BookRequestStatus;
  author: string;
  isbn: string;
  reason: string;
};

export type BookRequestRejectFormValues = {
  reason: string;
};

export type BookRequestsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
};

export type BookRequestsFooterProps = {
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

export type BookRequestActionMenuProps = {
  request: BookRequestRecord;
  onOpenDetail: (id: string) => void;
};

export type BookRequestRejectModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultReason?: string;
  onReject: (values: BookRequestRejectFormValues) => void;
};

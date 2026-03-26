export type CopyCatalogRecord = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  gmd: string;
  collation: string;
  publisher: string;
  publishingYear: string;
};

export type SearchFieldOption =
  | "all-fields"
  | "isbn"
  | "title-series"
  | "authors";
export type CatalogSourceOption = "loc-sru-voyager" | "slims-library";

export type SearchFilters = {
  query: string;
  field: SearchFieldOption;
  source: CatalogSourceOption;
};

export type CopyCatalogSelectionBarProps = {
  sidebarOpen: boolean;
  onSaveSelected: () => void;
};

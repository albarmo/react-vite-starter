export type BibliographicDetailField = {
  label: string;
  value: string;
  multiline?: boolean;
};

export type BibliographicLogEntry = {
  id: string;
  lastUpdated: string;
  userName: string;
  details: string[];
};

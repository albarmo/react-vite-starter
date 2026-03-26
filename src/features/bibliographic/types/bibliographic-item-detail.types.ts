export type ItemDetailField = {
  label: string;
  value: string;
};

export type ItemDetailRecord = {
  id: string;
  bibliographicId: string;
  itemCode: string;
  title: string;
  fields: ItemDetailField[];
};

export type BibliographicItemFormSelectOption = {
  value: string;
  label: string;
};

export type ItemFormValues = {
  title: string;
  itemCode: string;
  inventoryCode: string;
  location: string;
  shelfLocation: string;
  collectionType: string;
  itemStatus: string;
  orderNumber: string;
  orderDate: string;
  receivingDate: string;
  supplier: string;
  source: "buy" | "prize-grant";
  invoice: string;
  invoiceDate: string;
  priceCurrency: string;
  price: string;
};

export type BibliographicItemFormProps = {
  itemId?: string;
  pageTitle?: string;
};

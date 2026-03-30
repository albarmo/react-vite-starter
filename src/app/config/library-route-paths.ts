export const LIBRARY_ROUTE_PATHS = {
  root: "/library",
  bibliographic: {
    root: "/library/bibliographic",
    list: "/library/bibliographic/list",
    detail: "/library/bibliographic/detail/:id",
    itemDetail: "/library/bibliographic/item/detail/:id",
    itemEdit: "/library/bibliographic/item/edit/:id",
    create: "/library/bibliographic/create",
    edit: "/library/bibliographic/edit/:id",
    copyCataloging: "/library/bibliographic/copy-cataloging",
  },
  circulation: "/library/circulation",
  stockTake: "/library/stock-take",
  report: "/library/report",
  bookRequests: {
    root: "/library/book-requests",
    detail: "/library/book-requests/detail/:id",
  },
} as const;

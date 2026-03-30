export const APP_SECTION_ITEMS = [
  { id: "library", label: "Library" },
  { id: "gallery", label: "Gallery" },
  { id: "archive", label: "Archive" },
  { id: "museum", label: "Museum" },
] as const;

export type AppSectionId = (typeof APP_SECTION_ITEMS)[number]["id"];

export function getActiveSection(pathname: string): AppSectionId {
  if (pathname.startsWith("/gallery")) return "gallery";
  if (pathname.startsWith("/archive")) return "archive";
  if (pathname.startsWith("/museum")) return "museum";
  return "library";
}

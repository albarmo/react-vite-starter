"use client";

import { CatalogingServerForm } from "@/features/protected/library/master-file/tools/components/cataloging-server-form";

export function CatalogingServerCreatePage() {
  return (
    <CatalogingServerForm mode="create" pageTitle="Create Catalog Server" />
  );
}

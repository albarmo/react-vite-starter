"use client";

import { CatalogingServerForm } from "@/features/protected/library/master-file/tools/components/cataloging-server-form";
import { getEditCatalogingServerFormInitialState } from "@/features/protected/library/master-file/tools/components/cataloging-server-form-presets";
import { useParams } from "react-router-dom";

export function CatalogingServerEditPage() {
  const { id = "cataloging-server-1" } = useParams();

  return (
    <CatalogingServerForm
      mode="edit"
      pageTitle="Edit Catalog Server"
      initialState={getEditCatalogingServerFormInitialState(id)}
      recordId={id}
    />
  );
}

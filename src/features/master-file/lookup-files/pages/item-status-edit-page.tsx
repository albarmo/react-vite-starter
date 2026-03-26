"use client";

import { ItemStatusForm } from "@/features/master-file/lookup-files/components/item-status-form";
import { getEditItemStatusFormInitialState } from "@/features/master-file/lookup-files/components/item-status-form-presets";
import { useParams } from "react-router-dom";

export function ItemStatusEditPage() {
  const { id = "item-status-2" } = useParams();

  return (
    <ItemStatusForm
      mode="edit"
      pageTitle="Edit Item Status"
      initialState={getEditItemStatusFormInitialState(id)}
      recordId={id}
    />
  );
}

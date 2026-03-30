"use client";

import { ItemStatusForm } from "@/features/protected/library/master-file/lookup-files/components/item-status-form";
import { CREATE_ITEM_STATUS_FORM_INITIAL_STATE } from "@/features/protected/library/master-file/lookup-files/components/item-status-form-presets";

export function ItemStatusCreatePage() {
  return (
    <ItemStatusForm
      mode="create"
      pageTitle="Create Item Status"
      initialState={CREATE_ITEM_STATUS_FORM_INITIAL_STATE}
    />
  );
}

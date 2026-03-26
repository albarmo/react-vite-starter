"use client";

import { SupplierForm } from "@/features/master-file/authority-files/components/supplier-form";
import { CREATE_SUPPLIER_FORM_INITIAL_STATE } from "@/features/master-file/authority-files/components/supplier-form-presets";

export function SupplierCreatePage() {
  return (
    <SupplierForm
      mode="create"
      pageTitle="Create Supplier"
      initialState={CREATE_SUPPLIER_FORM_INITIAL_STATE}
    />
  );
}

"use client";

import { SupplierForm } from "@/features/master-file/components/supplier-form";
import { getEditSupplierFormInitialState } from "@/features/master-file/components/supplier-form-presets";
import { useParams } from "react-router-dom";

export function SupplierEditPage() {
  const { id = "" } = useParams();

  return (
    <SupplierForm
      mode="edit"
      pageTitle="Edit Supplier"
      initialState={getEditSupplierFormInitialState(id)}
    />
  );
}

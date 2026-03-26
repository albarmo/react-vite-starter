"use client";

import { ItemCodePatternForm } from "@/features/master-file/tools/components/item-code-pattern-form";
import { getEditItemCodePatternFormInitialState } from "@/features/master-file/tools/components/item-code-pattern-presets";
import { useParams } from "react-router-dom";

export function ItemCodePatternEditPage() {
  const { id = "item-code-pattern-1" } = useParams();

  return (
    <ItemCodePatternForm
      mode="edit"
      pageTitle="Edit Item Code Pattern"
      initialState={getEditItemCodePatternFormInitialState(id)}
      recordId={id}
    />
  );
}

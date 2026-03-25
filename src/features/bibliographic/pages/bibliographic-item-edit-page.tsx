"use client";

import { BibliographicItemForm } from "@/features/bibliographic/components/bibliographic-item-form";
import { useParams } from "react-router-dom";

export function BibliographicItemEditPage() {
  const { id = "item-1" } = useParams();

  return <BibliographicItemForm itemId={id} pageTitle="Edit Item" />;
}

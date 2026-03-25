"use client";

import { PublisherForm } from "@/features/master-file/components/publisher-form";
import { getEditPublisherFormInitialState } from "@/features/master-file/components/publisher-form-presets";
import { useParams } from "react-router-dom";

export function PublisherEditPage() {
  const { id = "" } = useParams();

  return (
    <PublisherForm
      mode="edit"
      pageTitle="Edit Publisher"
      initialState={getEditPublisherFormInitialState(id)}
    />
  );
}

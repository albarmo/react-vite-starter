"use client";

import { PublisherForm } from "@/features/protected/library/master-file/authority-files/components/publisher-form";
import { getEditPublisherFormInitialState } from "@/features/protected/library/master-file/authority-files/components/publisher-form-presets";
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

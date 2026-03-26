"use client";

import { FrequencyForm } from "@/features/master-file/lookup-files/components/frequency-form";
import { getEditFrequencyFormInitialState } from "@/features/master-file/lookup-files/components/frequency-form-presets";
import { useParams } from "react-router-dom";

export function FrequencyEditPage() {
  const { id = "frequency-1" } = useParams();

  return (
    <FrequencyForm
      mode="edit"
      pageTitle="Edit Frequency"
      initialState={getEditFrequencyFormInitialState(id)}
      recordId={id}
    />
  );
}

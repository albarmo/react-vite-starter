import type {
  BibliographicFormInitialState,
  BibliographicFormValues,
} from "@/features/protected/library/bibliographic/types/bibliographic-form.types";

const EMPTY_FORM_VALUES: BibliographicFormValues = {
  title: "",
  statementOfResponsibility: "",
  edition: "",
  specificDetailInfo: "",
  itemCodeBatchGenerator: "",
  totalItems: "",
  gmd: "",
  contentType: "",
  mediaType: "",
  carrierType: "",
  frequency: "",
  isbnIssn: "",
  publisher: "",
  publishingYear: "",
  publisherPlace: "",
  collation: "",
  seriesTitle: "",
  classification: "",
  callNumber: "",
  relatedBiblioData: "",
  language: "",
  abstractNotes: "",
  hideInOpac: "show",
  promoteToHomepage: "dont-promote",
};

const FILLED_FORM_VALUES: BibliographicFormValues = {
  title: "The Let Them Theory",
  statementOfResponsibility: "",
  edition: "",
  specificDetailInfo: "",
  itemCodeBatchGenerator: "p00000s",
  totalItems: "5",
  gmd: "text",
  contentType: "",
  mediaType: "",
  carrierType: "",
  frequency: "",
  isbnIssn: "625221049",
  publisher: "gramedia",
  publishingYear: "2025",
  publisherPlace: "",
  collation: "",
  seriesTitle: "",
  classification: "",
  callNumber: "",
  relatedBiblioData: "direct-source",
  language: "indonesia",
  abstractNotes:
    "Let Them; dua kata sederhana yang mengajak kita melepaskan hal-hal di luar kendali, agar energi hidup bisa fokus pada pilihan, tujuan, dan kebahagiaan yang benar-benar ingin dibangun.",
  hideInOpac: "show",
  promoteToHomepage: "promote",
};

export const CREATE_BIBLIOGRAPHIC_FORM_INITIAL_STATE: BibliographicFormInitialState =
  {
    ...EMPTY_FORM_VALUES,
    authors: [
      {
        id: "author-initial-1",
        name: "",
        authorType: "",
        classification: "",
      },
    ],
    subjects: [
      {
        id: "subject-initial-1",
        subject: "",
        subjectType: "",
        classification: "",
      },
    ],
    labels: [
      {
        id: "new-title",
        label: "New Title",
        icon: "heart",
        checked: false,
        url: "",
      },
      {
        id: "favorite-title",
        label: "Favorite Title",
        icon: "heart",
        checked: true,
        url: "",
      },
      {
        id: "multimedia",
        label: "Multimedia",
        icon: "play",
        checked: false,
        url: "",
      },
    ],
    attachment: null,
  };

export const EDIT_BIBLIOGRAPHIC_FORM_INITIAL_STATE: BibliographicFormInitialState =
  {
    ...FILLED_FORM_VALUES,
    authors: [
      {
        id: "author-edit-1",
        name: "Mel Robbins",
        authorType: "personal-name",
        classification: "primary-author",
      },
    ],
    subjects: [
      {
        id: "subject-edit-1",
        subject: "",
        subjectType: "",
        classification: "",
      },
    ],
    labels: [
      {
        id: "new-title",
        label: "New Title",
        icon: "heart",
        checked: false,
        url: "",
      },
      {
        id: "favorite-title",
        label: "Favorite Title",
        icon: "heart",
        checked: true,
        url: "https://example.com/favorite-title",
      },
      {
        id: "multimedia",
        label: "Multimedia",
        icon: "play",
        checked: false,
        url: "",
      },
    ],
    attachment: {
      name: "let_them_theory.png",
      size: 500 * 1024,
    },
  };

"use client";

// https://github.com/johnpolacek/date-range-picker-for-shadcn/tree/main#readme
import React, { useRef } from "react";

interface DateInputProps {
  value?: Date;
  onChange: (date: Date) => void;
}

interface DateParts {
  day: number;
  month: number;
  year: number;
}

type DraftDateParts = Partial<Record<keyof DateParts, string>>;

const getDateParts = (value?: Date): DateParts => {
  const d = value ? new Date(value) : new Date();

  return {
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
  };
};

const getValueKey = (value?: Date): number | null =>
  value ? new Date(value).getTime() : null;

const parseDatePart = (
  value: string | undefined,
  fallback: number,
): number | null => {
  if (value === undefined) {
    return fallback;
  }

  if (value === "") {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? null : parsedValue;
};

const parseDateParts = (
  draft: DraftDateParts,
  fallback: DateParts,
): DateParts | null => {
  const day = parseDatePart(draft.day, fallback.day);
  const month = parseDatePart(draft.month, fallback.month);
  const year = parseDatePart(draft.year, fallback.year);

  if (day === null || month === null || year === null) {
    return null;
  }

  return {
    day,
    month,
    year,
  };
};

const isValidDateParts = ({ day, month, year }: DateParts): boolean => {
  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1000 ||
    year > 9999
  ) {
    return false;
  }

  const d = new Date(year, month - 1, day);
  return (
    d.getFullYear() === year &&
    d.getMonth() + 1 === month &&
    d.getDate() === day
  );
};

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  const valueKey = getValueKey(value);
  const baseDate = getDateParts(value);
  const [draft, setDraft] = React.useState<{
    baseKey: number | null;
    values: DraftDateParts;
  }>(() => {
    return {
      baseKey: valueKey,
      values: {},
    };
  });
  const draftValues = draft.baseKey === valueKey ? draft.values : {};

  const monthRef = useRef<HTMLInputElement | null>(null);
  const dayRef = useRef<HTMLInputElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);

  const updateDraft = (values: DraftDateParts) => {
    setDraft({
      baseKey: valueKey,
      values,
    });
  };

  const getDisplayedValue = (field: keyof DateParts): string => {
    return draftValues[field] ?? baseDate[field].toString();
  };

  const getCurrentDate = (): DateParts => {
    const currentDate = parseDateParts(draftValues, baseDate);
    return currentDate && isValidDateParts(currentDate)
      ? currentDate
      : baseDate;
  };

  const handleInputChange =
    (field: keyof DateParts) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextDraftValues = {
        ...draftValues,
        [field]: e.target.value,
      };

      updateDraft(nextDraftValues);

      const nextDate = parseDateParts(nextDraftValues, baseDate);
      if (nextDate && isValidDateParts(nextDate)) {
        onChange(new Date(nextDate.year, nextDate.month - 1, nextDate.day));
      }
    };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (!e.target.value) {
      updateDraft({});
      return;
    }

    const nextDate = parseDateParts(draftValues, baseDate);
    if (!nextDate || !isValidDateParts(nextDate)) {
      updateDraft({});
    }
  };

  const handleKeyDown =
    (field: keyof DateParts) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow command (or control) combinations
      if (e.metaKey || e.ctrlKey) {
        return;
      }

      // Prevent non-numeric characters, excluding allowed keys
      if (
        !/^[0-9]$/.test(e.key) &&
        ![
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Delete",
          "Tab",
          "Backspace",
          "Enter",
        ].includes(e.key)
      ) {
        e.preventDefault();
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        let newDate = { ...getCurrentDate() };

        if (field === "day") {
          if (
            newDate[field] ===
            new Date(newDate.year, newDate.month, 0).getDate()
          ) {
            newDate = { ...newDate, day: 1, month: (newDate.month % 12) + 1 };
            if (newDate.month === 1) newDate.year += 1;
          } else {
            newDate.day += 1;
          }
        }

        if (field === "month") {
          if (newDate[field] === 12) {
            newDate = { ...newDate, month: 1, year: newDate.year + 1 };
          } else {
            newDate.month += 1;
          }
        }

        if (field === "year") {
          newDate.year += 1;
        }

        updateDraft({
          day: newDate.day.toString(),
          month: newDate.month.toString(),
          year: newDate.year.toString(),
        });
        onChange(new Date(newDate.year, newDate.month - 1, newDate.day));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        let newDate = { ...getCurrentDate() };

        if (field === "day") {
          if (newDate[field] === 1) {
            newDate.month -= 1;
            if (newDate.month === 0) {
              newDate.month = 12;
              newDate.year -= 1;
            }
            newDate.day = new Date(newDate.year, newDate.month, 0).getDate();
          } else {
            newDate.day -= 1;
          }
        }

        if (field === "month") {
          if (newDate[field] === 1) {
            newDate = { ...newDate, month: 12, year: newDate.year - 1 };
          } else {
            newDate.month -= 1;
          }
        }

        if (field === "year") {
          newDate.year -= 1;
        }

        updateDraft({
          day: newDate.day.toString(),
          month: newDate.month.toString(),
          year: newDate.year.toString(),
        });
        onChange(new Date(newDate.year, newDate.month - 1, newDate.day));
      }

      if (e.key === "ArrowRight") {
        if (
          e.currentTarget.selectionStart === e.currentTarget.value.length ||
          (e.currentTarget.selectionStart === 0 &&
            e.currentTarget.selectionEnd === e.currentTarget.value.length)
        ) {
          e.preventDefault();
          if (field === "month") dayRef.current?.focus();
          if (field === "day") yearRef.current?.focus();
        }
      } else if (e.key === "ArrowLeft") {
        if (
          e.currentTarget.selectionStart === 0 ||
          (e.currentTarget.selectionStart === 0 &&
            e.currentTarget.selectionEnd === e.currentTarget.value.length)
        ) {
          e.preventDefault();
          if (field === "day") monthRef.current?.focus();
          if (field === "year") dayRef.current?.focus();
        }
      }
    };

  return (
    <div className="flex items-center rounded-lg border px-1 text-base">
      <input
        type="text"
        ref={monthRef}
        max={12}
        maxLength={2}
        value={getDisplayedValue("month")}
        onChange={handleInputChange("month")}
        onKeyDown={handleKeyDown("month")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur}
        className="w-6 border-none p-0 text-center outline-none"
        placeholder="M"
      />
      <span className="-mx-px opacity-20">/</span>
      <input
        type="text"
        ref={dayRef}
        max={31}
        maxLength={2}
        value={getDisplayedValue("day")}
        onChange={handleInputChange("day")}
        onKeyDown={handleKeyDown("day")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur}
        className="w-7 border-none p-0 text-center outline-none"
        placeholder="D"
      />
      <span className="-mx-px opacity-20">/</span>
      <input
        type="text"
        ref={yearRef}
        max={9999}
        maxLength={4}
        value={getDisplayedValue("year")}
        onChange={handleInputChange("year")}
        onKeyDown={handleKeyDown("year")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur}
        className="w-12 border-none p-0 text-center outline-none"
        placeholder="YYYY"
      />
    </div>
  );
};

DateInput.displayName = "DateInput";

export { DateInput };

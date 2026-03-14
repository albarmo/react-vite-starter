import { ComponentProps, useCallback, useMemo, useState } from "react";
import { SearchInput } from "../components/common/search-input";

type UseLocalSearchProps<T> = {
  data: T[];
  fieldsToSearch: Array<string>;
};

type UseLocalSearchReturn<T> = {
  searchedData: T[];
  searchTerm: string;
  renderSearchInput: (
    arg?: ComponentProps<typeof SearchInput>,
  ) => React.ReactElement;
};

function getNestedColumn<T>(obj: T, accessor: string) {
  const keys = accessor.split(".");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = obj;

  keys.forEach((key) => {
    value = value?.[key];
  });

  return value;
}

export function useLocalSearch<T>({
  fieldsToSearch,
  data,
}: UseLocalSearchProps<T>): UseLocalSearchReturn<T> {
  const [searchTerm, setSearchTerm] = useState("");

  const renderSearchInput = useCallback(
    (props: ComponentProps<typeof SearchInput> = {}) => (
      <SearchInput
        {...props}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    ),
    [searchTerm],
  );

  const searchedData = useMemo(() => {
    if (!fieldsToSearch.length) return data;

    return data.filter((item) => {
      return fieldsToSearch.some((field) => {
        const value = getNestedColumn(item, field);

        if (typeof value === "string") {
          const hay = value.toLowerCase();

          return hay.includes(searchTerm.toLowerCase());
        }

        return true;
      });
    });
  }, [searchTerm, data, fieldsToSearch]);

  return {
    renderSearchInput,
    searchTerm,
    searchedData,
  };
}

import { useSearchParams } from "react-router-dom";

import type { URLSearchParamsInit } from "react-router-dom";

function useParsedSearchParams<T = { [key: string]: string }>(
  defaultInit?: URLSearchParamsInit,
): [
  searchParams: T,
  setURLSearchParams: ReturnType<typeof useSearchParams>[1],
] {
  const [searchParams, setURLSearchParams] = useSearchParams(defaultInit);

  function convertSearchParamsToObject(): T {
    const obj: { [key: string]: string } = {};

    for (const [key, value] of searchParams) {
      obj[key] = value;
    }

    return obj as T;
  }

  return [convertSearchParamsToObject(), setURLSearchParams];
}

export default useParsedSearchParams;

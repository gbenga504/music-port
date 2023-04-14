import { useSearchParams as useQueryParams } from "react-router-dom";

import type { URLSearchParamsInit as URLQueryParamsInit } from "react-router-dom";

function useParsedQueryParams<T = { [key: string]: string }>(
  defaultInit?: URLQueryParamsInit,
): [query: T, setURLQueryParams: ReturnType<typeof useQueryParams>[1]] {
  const [queryParams, setURLQueryParams] = useQueryParams(defaultInit);

  function convertQueryParamsToObject(): T {
    const obj: { [key: string]: string } = {};

    for (const [key, value] of queryParams) {
      obj[key] = value;
    }

    return obj as T;
  }

  return [convertQueryParamsToObject(), setURLQueryParams];
}

export default useParsedQueryParams;

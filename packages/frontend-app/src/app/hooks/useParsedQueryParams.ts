import { useSearchParams as useQueryParams } from "react-router-dom";

import type { URLSearchParamsInit as URLQueryParamsInit } from "react-router-dom";
import type { z } from "zod";

// @TODO: Try to infer T instead of assigning a default
function useParsedQueryParams<T = { [key: string]: string }>(
  defaultInit?: URLQueryParamsInit,
  validator?: z.AnyZodObject,
): [query: T, setURLQueryParams: ReturnType<typeof useQueryParams>[1]] {
  const [queryParams, setURLQueryParams] = useQueryParams(defaultInit);

  function convertQueryParamsToObject(): T {
    const obj: { [key: string]: string } = {};

    for (const [key, value] of queryParams) {
      obj[key] = value;
    }

    if (validator) {
      validator.parse(obj);
    }

    return obj as T;
  }

  return [convertQueryParamsToObject(), setURLQueryParams];
}

export default useParsedQueryParams;

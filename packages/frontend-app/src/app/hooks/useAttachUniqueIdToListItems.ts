import { nanoid } from "nanoid";
import { useEffect, useState, useRef } from "react";

function attachUniqueIdToListItems<T>(list: T[]) {
  return list.map((item) => ({
    ...item,
    id: nanoid(),
  }));
}

export function useAttachUniqueIdToListItems<T>(list: T[]) {
  const hasAttachedUniqueIdOnFirstRender = useRef(true);
  const [modifiedList, setModifiedList] = useState(
    attachUniqueIdToListItems(list),
  );

  useEffect(() => {
    if (hasAttachedUniqueIdOnFirstRender.current) {
      hasAttachedUniqueIdOnFirstRender.current = false;

      return;
    }

    setModifiedList(attachUniqueIdToListItems(list));
  }, [list]);

  return modifiedList;
}

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

function attachUniqueIdToListItems<T>(list: T[]) {
  return list.map((item) => ({
    ...item,
    id: nanoid(),
  }));
}

export function useAttachUniqueIdToListItems<T>(list: T[]) {
  const [modifiedList, setModifiedList] = useState(
    attachUniqueIdToListItems(list),
  );

  useEffect(() => {
    setModifiedList(attachUniqueIdToListItems(list));
  }, [list]);

  return modifiedList;
}

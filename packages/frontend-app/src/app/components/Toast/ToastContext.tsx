import { omit } from "lodash";
import React, { useContext, createContext, useState, useMemo } from "react";

import { Toast } from "./Toast";

import type { IToastSettings } from "./Toast";
import type { ReactNode } from "react";

interface IContextValue extends IToastSettings {
  onChangeContextValue?: (value: IToastSettings) => void;
}

const ToastContext = createContext<IContextValue>({});

export const useToast = () => {
  const { onChangeContextValue } = useContext(ToastContext);

  return function (value: IToastSettings): void {
    onChangeContextValue?.(value);
  };
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contextValue, setContextValue] = useState<IContextValue>({});

  const handleChangeContextValue = (value: IToastSettings): void => {
    setContextValue({ ...value, id: value.id || Date.now().toString() });
  };

  const handleCloseToast = (): void => {
    setContextValue({ id: undefined });
  };

  const memoizedContextValue = useMemo<IContextValue>(() => {
    return {
      ...contextValue,
      onChangeContextValue: handleChangeContextValue,
    };
  }, [contextValue]);

  return (
    <ToastContext.Provider value={memoizedContextValue}>
      {children}
      {contextValue.id && (
        <Toast
          {...omit(memoizedContextValue, ["onChangeContextValue"])}
          onClose={handleCloseToast}
        />
      )}
    </ToastContext.Provider>
  );
};

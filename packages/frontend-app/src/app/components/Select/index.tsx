import React, { useState, cloneElement, useMemo } from "react";
import classNames from "classnames";

import type { ReactNode } from "react";

import { RedStarIcon, ArrowDownIcon } from "../icons";
import { sleep } from "../../../utils/sleep";
import "./index.scss";
import { Button } from "../Button";
import { flattenOptionGroups, getOptionsFromChildren } from "./utils";

export type IRenderLabel = (opts: {
  label: string;
  value: string;
}) => ReactNode;

interface IProps {
  label?: string;
  size?: "medium" | "small";
  variant?: "dashed" | "outlined";
  onChange?: (opts: { value: string }) => void;
  value?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  name?: string;
  placeholder: string;
  children: ReactNode;
  invisibleLabel?: boolean;
  theme?: "dark" | "white";
  renderLabel?: IRenderLabel;
}

const Select: React.FC<IProps> = ({
  label,
  required,
  helperText,
  error,
  fullWidth,
  size = "medium",
  variant = "outlined",
  disabled,
  name,
  value,
  children,
  placeholder,
  theme = "white",
  invisibleLabel,
  renderLabel: customRenderLabel,
  onChange,
}) => {
  const [selectedOptionValue, setSelectedOptionValue] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOnScreen, setIsDropdownOnScreen] = useState(false);

  const options = useMemo(() => {
    const options = getOptionsFromChildren(children);

    return flattenOptionGroups(options);
  }, [children]);

  const selectedOptionLabel = useMemo(() => {
    const option = options.find(
      (option) => option.value === selectedOptionValue
    );

    return option?.label!;
  }, [selectedOptionValue]);

  const toggleDropdownVisibility = async () => {
    if (disabled) return;

    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      await sleep(100);

      setIsDropdownOnScreen(true);
      return;
    }

    setIsDropdownOpen(false);
    await sleep(500);
    setIsDropdownOnScreen(false);
  };

  const handleChange = ({ value }: { value: string }) => {
    toggleDropdownVisibility();
    setSelectedOptionValue(value);
    onChange?.({ value });
  };

  const renderLabel = () => {
    const getLabel = () => {
      if (customRenderLabel) {
        return customRenderLabel({
          label: selectedOptionLabel,
          value: selectedOptionValue!,
        });
      }

      return selectedOptionLabel;
    };

    return (
      <span
        className={classNames(`label ${theme}`, {
          placeholderMode: !selectedOptionValue,
        })}
      >
        {selectedOptionValue ? getLabel() : placeholder}
      </span>
    );
  };

  const renderDropdown = () => {
    return (
      <ul
        className={classNames(`select-dropdown ${theme}`, {
          fullWidth,
          open: isDropdownOpen,
          motion: isDropdownOnScreen,
        })}
      >
        {options.map((option) => (
          <React.Fragment key={option.value}>
            {cloneElement(option.node, { onChange: handleChange, theme })}
          </React.Fragment>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex-1 relative">
      {(label || invisibleLabel) && (
        <div
          className={classNames(
            "flex items-start mb-2 min-h-[24px] max-h-[24px]",
            {
              invisible: invisibleLabel,
            }
          )}
        >
          <span className="text-primaryGray">{label}</span>
          {required && (
            <span className="ml-1">
              <RedStarIcon size={10} />
            </span>
          )}
        </div>
      )}
      <div
        className={classNames("select-overlay", {
          open: isDropdownOpen,
          motion: isDropdownOnScreen,
        })}
        onClick={toggleDropdownVisibility}
      />
      <Button
        variant="transparent"
        className={classNames("select", {
          fullWidth,
          small: size === "small",
          medium: size === "medium",
          outlined: variant === "outlined",
          dashed: variant === "dashed",
          disabled,
          error,
        })}
        onClick={toggleDropdownVisibility}
      >
        {renderLabel()}
        {!disabled && (
          <ArrowDownIcon
            color="#64748B"
            size={25}
            className="absolute right-0"
          />
        )}
        <input
          name={name}
          value={selectedOptionValue}
          required={required}
          hidden
        />
      </Button>
      {renderDropdown()}
      {helperText && (
        <p
          className={classNames("mt-2 text-xs", {
            "text-red-600": error === true,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Should be used by the consumer
interface IOptionProps {
  value: string;
  label?: string;
  children: ReactNode;
}

// Should only be used internally
interface IOptionAllProps extends IOptionProps {
  onChange: (opts: { value: string }) => void;
  theme: "dark" | "white";
}

const Option: React.FC<IOptionAllProps> = ({
  value,
  theme,
  children,
  onChange,
}) => {
  const handleChange = () => {
    onChange({ value });
  };

  return (
    <li className={classNames(`select-option ${theme}`)}>
      <Button
        variant="transparent"
        onClick={handleChange}
        className="option-button"
      >
        {children}
      </Button>
    </li>
  );
};

const CompoundOption = Option as React.FC<IOptionProps>;

export { CompoundOption as Option, Select };

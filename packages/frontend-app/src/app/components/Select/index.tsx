import classNames from "classnames";
import React, {
  useState,
  cloneElement,
  useMemo,
  useEffect,
  useRef,
} from "react";

import "./index.scss";
import { flattenOptionGroups, getOptionsFromChildren } from "./utils";

import { sleep } from "../../../utils/sleep";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { Button } from "../Button/Button";
import { RedStarIcon, ArrowDownIcon } from "../icons";

import type { ReactNode } from "react";

export type IRenderLabel<T> = (opts: { label: string; value: T }) => ReactNode;

interface IProps {
  label?: string;
  size?: "medium" | "small";
  variant?: "dashed" | "outlined";
  onChange?: (value: string | number) => void;
  value?: string | number;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  name?: string;
  placeholder: string;
  children: ReactNode;
  theme?: "dark" | "white";
  renderLabel?: IRenderLabel<any>;
  classes?: { select?: string; label?: string };
  onBlur?: () => void;
  onFocus?: () => void;
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
  renderLabel: customRenderLabel,
  onChange,
  classes = {},
  onBlur,
  onFocus,
}) => {
  const [selectedOptionValue, setSelectedOptionValue] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOnScreen, setIsDropdownOnScreen] = useState(false);
  const dropdownSelectableAreaRef = useRef(null);

  useOnClickOutside(dropdownSelectableAreaRef, async () => {
    await hideDropdown();
  });

  useEffect(() => {
    setSelectedOptionValue(value);
  }, [value]);

  const options = useMemo(() => {
    const options = getOptionsFromChildren(children);

    return flattenOptionGroups(options);
  }, [children]);

  const selectedOptionLabel = useMemo(() => {
    const option = options.find(
      (option) => option.value === selectedOptionValue
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    return option?.label!;
  }, [selectedOptionValue]);

  async function hideDropdown() {
    setIsDropdownOpen(false);
    await sleep(500);
    setIsDropdownOnScreen(false);
    onBlur?.();
  }

  const toggleDropdownVisibility = async () => {
    if (disabled) return;

    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      await sleep(100);

      setIsDropdownOnScreen(true);
      onFocus?.();

      return;
    }

    await hideDropdown();
  };

  const handleChange = (value: string | number) => {
    toggleDropdownVisibility();
    setSelectedOptionValue(value);
    onChange?.(value);
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
        className={classNames(
          `label ${theme} whitespace-nowrap overflow-hidden`,
          {
            placeholderMode: !selectedOptionValue,
          }
        )}
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
    <div
      className={classNames("relative", {
        "flex-1": fullWidth,
      })}
    >
      {label && (
        <div className={classNames("flex items-start mb-2")}>
          <span
            className={classNames("text-primaryGray", {
              [`${classes.label}`]: classes.label,
            })}
          >
            {label}
          </span>
          {required && (
            <span className="ml-1">
              <RedStarIcon size={10} />
            </span>
          )}
        </div>
      )}
      <div className="relative" ref={dropdownSelectableAreaRef}>
        <Button
          variant="transparent"
          htmlType="button"
          className={classNames("select", {
            fullWidth,
            small: size === "small",
            medium: size === "medium",
            outlined: variant === "outlined",
            dashed: variant === "dashed",
            disabled,
            error,
            [`${classes.select}`]: !!classes.select,
          })}
          onClick={toggleDropdownVisibility}
          disabled={disabled}
        >
          {renderLabel()}
          {!disabled && (
            <ArrowDownIcon
              color="#64748B"
              size={25}
              className="absolute right-0"
            />
          )}
          <input name={name} value={selectedOptionValue} hidden readOnly />
        </Button>
        {renderDropdown()}
      </div>
      {helperText && (
        <p
          className={classNames("mt-2 text-xs absolute", {
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
  value: string | number;
  label?: string;
  children: ReactNode;
}

// Should only be used internally
interface IOptionInternalProps extends IOptionProps {
  onChange: (value: string | number) => void;
  theme: "dark" | "white";
}

const Option: React.FC<IOptionInternalProps> = ({
  value,
  theme,
  children,
  onChange,
}) => {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <li className={classNames(`select-option ${theme}`)}>
      <Button
        variant="transparent"
        onClick={handleChange}
        className="option-button"
        htmlType="button"
      >
        {children}
      </Button>
    </li>
  );
};

const CompoundOption = Option as React.FC<IOptionProps>;

export { CompoundOption as Option, Select };

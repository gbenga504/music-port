import classNames from "classnames";
import React, { useMemo } from "react";

import { ArrowDownIcon } from "../icons";
import { Button } from "../Button";

import "./Pagination.scss";

interface IOnChangeParams {
  current: number;
  pageSize: number;
}

interface IProps {
  total: number;
  current?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onChange?: (val: IOnChangeParams) => void;
  fullWidth?: boolean;
}

export const Pagination: React.FC<IProps> = ({
  total = 0,
  current = 1,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onChange,
  fullWidth,
}) => {
  const paginationItems = useMemo(() => {
    let results: { type: "seperator" | "number"; value?: number }[] = [];
    const totalNumberOfPages = total / pageSize;

    if (totalNumberOfPages === 5) {
      // If the total number of pages is just 5, then we want to show
      // all the 5 pages since its not a lot
      for (let i = 1; i <= 5; i++) {
        results.push({ type: "number", value: i });
      }
    } else {
      let i = 1;

      while (i <= totalNumberOfPages) {
        if (i === 1 || i === totalNumberOfPages || i === current) {
          // We want to show the first, last and the current page number
          results.push({ type: "number", value: i });

          i++;
        } else {
          // We want to show the [current_item_position +/- 2]th items
          // i.e if the position of the current item is 5, then we want to
          // show the 3rd and 4th items and the 6th and 7th items
          const maximumLeftNumber = current - 2;
          const maximumRightNumber = current + 2;

          if (i === maximumLeftNumber || i === maximumLeftNumber + 1) {
            results.push({ type: "number", value: i });
            i++;
          } else if (i === maximumRightNumber || i === maximumRightNumber - 1) {
            results.push({ type: "number", value: i });
            i++;
          } else {
            // If there is no match, then we show a seperator
            // If i is lower then the maximumLeftNumber then we assign to the max left number
            // else i becomes the last page
            results.push({ type: "seperator" });

            if (i < current) {
              i = maximumLeftNumber;
            } else {
              i = totalNumberOfPages;
            }
          }
        }
      }
    }

    return results;
  }, [total, current, pageSize]);

  const handleChange =
    (changeset: { current?: number; pageSize?: number }) => () => {
      onChange?.({ current, pageSize, ...changeset });
    };

  return (
    <ul className={classNames("pagination", { fullWidth })}>
      <li
        tabIndex={0}
        className={classNames("pagination-list-item", {
          disabled: current === 1,
        })}
      >
        <Button
          variant="transparent"
          tabIndex={-1}
          disabled={current === 1}
          onClick={handleChange({ current: current - 1 })}
        >
          <ArrowDownIcon className="rotate-90" />
        </Button>
      </li>
      {paginationItems.map((paginationItem, i) => {
        const { type, value } = paginationItem;
        const isSeperator = type === "seperator";
        const title = !isSeperator
          ? value?.toString()
          : `page size separator ${i}`;

        return (
          <li
            title={title}
            key={title}
            tabIndex={0}
            className={classNames("pagination-list-item", {
              active: value === current,
            })}
          >
            <Button
              variant="transparent"
              tabIndex={-1}
              className={classNames({
                ellipsis: type === "seperator",
              })}
              onClick={
                !isSeperator && value !== current
                  ? handleChange({ current: value })
                  : undefined
              }
            >
              {type === "seperator" ? "•••" : value}
            </Button>
          </li>
        );
      })}
      <li
        tabIndex={0}
        className={classNames("pagination-list-item", {
          disabled: current === total / pageSize,
        })}
      >
        <Button
          variant="transparent"
          tabIndex={-1}
          disabled={current === total / pageSize}
          onClick={handleChange({ current: current + 1 })}
        >
          <ArrowDownIcon className="-rotate-90" />
        </Button>
      </li>
      <li className="ml-4 inline-block">
        <select
          className="pagination-page-size-selector"
          onChange={(evt) =>
            handleChange({ pageSize: Number(evt.target.value), current: 1 })()
          }
        >
          {pageSizeOptions.map((pageSizeOption) => (
            <option value={pageSizeOption} key={pageSizeOption}>
              {pageSizeOption}
            </option>
          ))}
        </select>
      </li>
    </ul>
  );
};

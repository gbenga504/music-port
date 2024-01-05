import classNames from "classnames";
import React, { Children, cloneElement } from "react";

import { SpinnerIcon } from "../icons";

import type { ReactElement, ReactNode } from "react";

import "./Table.scss";

interface ITableProps {
  children: ReactElement | ReactElement[];
  stickyHeader?: boolean;
  classes?: { container?: string; table?: string; loadingContainer?: string };
  loading?: boolean;
  minWidth?: number;
}

const Table: React.FC<ITableProps> = ({
  classes = {},
  children,
  stickyHeader = false,
  loading = false,
  minWidth = 0,
}) => {
  return (
    <div
      className={classNames(
        "w-full text-whiteWithAlpha overflow-x-auto relative",
        {
          [classes.container!]: !!classes.container,
        }
      )}
    >
      {loading && (
        <div
          className={classNames(
            "absolute left-0 w-full h-full top-0 flex items-center",
            "justify-center z-1000",
            {
              [classes.loadingContainer!]: !!classes.loadingContainer,
            }
          )}
        >
          <SpinnerIcon />
        </div>
      )}
      <table
        className={classNames("w-full table border-spacing-0", {
          [classes.table!]: !!classes.table,
        })}
        style={{ minWidth }}
      >
        {Children.map(children, (child, i) => (
          <React.Fragment key={i}>
            {cloneElement(child, { stickyHeader })}
          </React.Fragment>
        ))}
      </table>
    </div>
  );
};

interface ITableHeadProps {
  className?: string;
  children: ReactElement<any, typeof TableRow>;
}

interface ITableHeadInternalProps extends ITableHeadProps {
  stickyHeader?: boolean;
}

const TableHead: React.FC<ITableHeadInternalProps> = ({
  className,
  children,
  stickyHeader,
}) => {
  // Here we verify that we only have one child i.e the TableRow element
  // and return it else throw an error.
  // We then pass an internal prop to this component
  // telling it that its' parent is a TableHead component
  const child = Children.only(children);

  return (
    <thead
      className={classNames("table-header-group text-xs font-thin", {
        [className!]: !!className,
      })}
    >
      {cloneElement(child, { isEncapsulatedByTableHead: true, stickyHeader })}
    </thead>
  );
};

interface ITableBodyProps {
  className?: string;
  children:
    | ReactElement<any, typeof TableRow>
    | ReactElement<any, typeof TableRow>[]
    | null;
}

const TableBody: React.FC<ITableBodyProps> = ({ className, children }) => {
  return (
    <tbody
      className={classNames("table-row-group text-sm font-light", {
        [className!]: !!className,
      })}
    >
      {children}
    </tbody>
  );
};

interface ITableRowProps {
  className?: string;
  children: ReactElement | ReactElement[];
  onClick?: () => void;
  selected?: boolean;
}

interface ITableRowInternalProps extends ITableRowProps {
  isEncapsulatedByTableHead: boolean;
  isEncapsulatedByTableFooter: boolean;
  stickyHeader: boolean;
}

const TableRow: React.FC<ITableRowInternalProps> = ({
  className,
  children,
  isEncapsulatedByTableHead,
  isEncapsulatedByTableFooter,
  stickyHeader,
  onClick,
  selected,
}) => {
  let extraProps = {};

  if (!isEncapsulatedByTableHead && !isEncapsulatedByTableFooter && onClick) {
    extraProps = { role: "button", tabIndex: "0" };
  }

  return (
    <tr
      {...extraProps}
      onClick={onClick}
      className={classNames("table-row align-middle outline-0", {
        [className!]: !!className,
        "hover:bg-secondary200 focus:bg-secondary200":
          !isEncapsulatedByTableHead && !isEncapsulatedByTableFooter,
        "odd:bg-secondary150":
          !isEncapsulatedByTableHead && !isEncapsulatedByTableFooter,
        "bg-primary": selected,
      })}
    >
      {Children.map(children, (child, i) => (
        <React.Fragment key={i}>
          {cloneElement(child, { isEncapsulatedByTableHead, stickyHeader })}
        </React.Fragment>
      ))}
    </tr>
  );
};

interface ITableCellProps {
  className?: string;
  children: ReactNode;
  align?: "center" | "justify" | "left" | "right";
  colSpan?: number;
}

interface ITableCellInternalProps extends ITableCellProps {
  isEncapsulatedByTableHead: boolean;
  stickyHeader: boolean;
}

const TableCell: React.FC<ITableCellInternalProps> = ({
  className,
  children,
  isEncapsulatedByTableHead,
  stickyHeader,
  align = "left",
  colSpan,
}) => {
  const Element = isEncapsulatedByTableHead ? "th" : "td";
  let extraProps = {};

  if (Element === "td" && colSpan) {
    extraProps = { colSpan };
  }

  return (
    <Element
      className={classNames("TableCell table-cell align-middle text-left p-2", {
        [className!]: !!className,
        ["sticky top-0"]: stickyHeader,
        "text-left": align === "left",
        "text-right": align === "right",
        "text-center": align === "center",
        "text-justify": align === "justify",
      })}
      scope="col"
      {...extraProps}
    >
      <div>{children}</div>
    </Element>
  );
};

interface ITableFooterProps {
  children: ReactElement<any, typeof TableRow>;
}

const TableFooter: React.FC<ITableFooterProps> = ({ children }) => {
  return (
    <tfoot className="table-footer-group">
      {cloneElement(children, { isEncapsulatedByTableFooter: true })}
    </tfoot>
  );
};

const CompoundTableHead = TableHead as React.FC<ITableHeadProps>;
const CompoundTableRow = TableRow as React.FC<ITableRowProps>;
const CompoundTableCell = TableCell as React.FC<ITableCellProps>;

export {
  Table,
  CompoundTableHead as TableHead,
  TableBody,
  CompoundTableRow as TableRow,
  CompoundTableCell as TableCell,
  TableFooter,
};

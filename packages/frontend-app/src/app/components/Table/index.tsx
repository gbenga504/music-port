import React, { Children, cloneElement } from "react";
import classNames from "classnames";

import type { ReactElement, ReactNode } from "react";

interface ITableProps {
  children: ReactElement | ReactElement[];
  stickyHeader?: boolean;
  classes?: { container?: string; table?: string };
}

const Table: React.FC<ITableProps> = ({
  classes = {},
  children,
  stickyHeader = false,
}) => {
  return (
    <div
      className={classNames(
        "w-full overflow-x-auto border border-lightGray rounded-md",
        {
          [classes.container!]: !!classes.container,
        }
      )}
    >
      <table
        className={classNames("w-full table border-spacing-0 min-w-[750px]", {
          [classes.table!]: !!classes.table,
        })}
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
      className={classNames("text-primaryGray table-header-group", {
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
    | ReactElement<any, typeof TableRow>[];
}

const TableBody: React.FC<ITableBodyProps> = ({ className, children }) => {
  return (
    <tbody
      className={classNames("text-white table-row-group", {
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

  if (!isEncapsulatedByTableHead && !isEncapsulatedByTableFooter) {
    extraProps = { role: "button", tabIndex: "0" };
  }

  return (
    <tr
      {...extraProps}
      onClick={onClick}
      className={classNames("table-row align-middle outline-0", {
        [className!]: !!className,
        "hover:bg-secondaryAlpha focus:bg-secondaryAlpha":
          !isEncapsulatedByTableHead && !isEncapsulatedByTableFooter,
        "border-l-2 border-l-primary bg-secondaryAlpha": selected,
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
      className={classNames(
        "font-normal table-cell align-middle text-left p-4",
        {
          [className!]: !!className,
          ["sticky top-0"]: stickyHeader,
          "text-left": align === "left",
          "text-right": align === "right",
          "text-center": align === "center",
          "text-justify": align === "justify",
        }
      )}
      scope="col"
      {...extraProps}
    >
      {children}
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

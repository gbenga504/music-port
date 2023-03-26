import React, { ReactElement } from "react";

interface IGetOptionsFromChildren {
  options?: IGetOptionsFromChildren[];
  value?: string;
  label: string;
  node: ReactElement;
}

export function getOptionsFromChildren(
  children: React.ReactNode,
): IGetOptionsFromChildren[] {
  if (children == null) {
    return [];
  }

  const selectChildren: IGetOptionsFromChildren[] = [];

  React.Children.forEach(children, (_node) => {
    const node = _node as React.ReactElement;
    const nodeChildren = node?.props?.children;

    if (node?.props?.value === undefined) {
      if (nodeChildren !== null) {
        const group = {
          options: getOptionsFromChildren(nodeChildren),
          label: node.props.label,
          node,
        };

        selectChildren.push(group);
      }

      return;
    }

    const option = {
      value: node.props.value,
      label: node.props.label || node.props.children,
      node,
    };

    selectChildren.push(option);
  });

  return selectChildren ?? [];
}

export function isOptionGroup(
  child: IGetOptionsFromChildren,
): child is IGetOptionsFromChildren {
  return !!child.options;
}

interface IFlattenOptionGroups {
  value: string;
  label: string;
  node: ReactElement;
}

export function flattenOptionGroups(
  groupedOptions: IGetOptionsFromChildren[],
): IFlattenOptionGroups[] {
  let flatOptions: IFlattenOptionGroups[] = [];

  groupedOptions.forEach((optionOrGroup) => {
    if (isOptionGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(
        flattenOptionGroups(optionOrGroup.options!),
      );
    } else {
      flatOptions.push({
        ...(optionOrGroup as IFlattenOptionGroups),
      });
    }
  });

  return flatOptions;
}

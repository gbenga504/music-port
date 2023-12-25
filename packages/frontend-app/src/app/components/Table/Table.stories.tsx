import React from "react";

import { Pagination } from "./Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "./Table";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Table> = {
  title: "Table",
  component: Table,
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center w-screen h-screen bg-secondary400 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const BaseTable: Story = {
  render: ({ ...rest }) => {
    return (
      <Table {...rest}>
        <TableHead>
          <TableRow>
            <TableCell>Song</TableCell>
            <TableCell align="left">Artist</TableCell>
            <TableCell align="left">Album</TableCell>
            <TableCell align="left">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Be There For Me</TableCell>
            <TableCell align="left">NCT 127</TableCell>
            <TableCell align="left">Golden</TableCell>
            <TableCell align="left">3:26</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Standing Next to You</TableCell>
            <TableCell align="left">Jung Kook</TableCell>
            <TableCell align="left">Perfect Night - Single</TableCell>
            <TableCell align="left">3:26</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="p-0" colSpan={4}>
              <div className="min-h-[54px] relative flex justify-start md:justify-end pl-6 pr-3 items-center">
                <Pagination
                  total={50}
                  current={1}
                  pageSize={10}
                  onChange={(value) => console.log(value)}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  },
  args: {
    stickyHeader: true,
  },
};

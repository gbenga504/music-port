import React, { useState } from "react";
import classNames from "classnames";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";

import { AppHeader } from "../../components/AppHeader";
import { Button } from "../../components/Button";
import { PageLayout } from "../../components/PageLayout";
import { Option, Select } from "../../components/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "../../components/Table";
import { Pagination } from "../../components/Table/Pagination";

const Community: React.FC<ILoadableComponentProps> = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const renderHeadline = () => {
    return (
      <h3 className="font-bold text-2xl md:text-4xl">
        <span className="text-primary">Discover</span>
        <span> a new world of music with our shared community playlists</span>
      </h3>
    );
  };

  const renderTagline = () => {
    return (
      <span className="text-base px-0 md:px-12 text-primaryGray">
        Finally, you can preview lots of musical playlist shared by different
        users, in different genres and streaming services for you to enjoy.
      </span>
    );
  };

  const renderPlaylistOverview = () => {
    return (
      <div className="w-full">
        <div className="w-full rounded-t-md border border-lightGray p-4 flex justify-between items-center">
          <span>Playlist overview</span>
          <Select
            placeholder="Filter by Genre"
            size="small"
            theme="dark"
            selectClassName="!w-[16ch]"
          >
            <Option value="general">General</Option>
            <Option value="hippop">Hip pop</Option>
            <Option value="afro">Afro pop</Option>
          </Select>
        </div>
        <Table stickyHeader className="border-t-0 rounded-t-none">
          <TableHead>
            <TableRow>
              <TableCell>Cover</TableCell>
              <TableCell>Poster</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Streaming service</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Drip or down</TableCell>
              <TableCell>Skull face</TableCell>
              <TableCell>General</TableCell>
              <TableCell>Apple music</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="p-0" colspan={4}>
                <div className="min-h-[54px] relative flex justify-end pl-6 pr-3 items-center">
                  <Pagination
                    total={500}
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    onChange={(val) => setPagination(val)}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  };

  return (
    <PageLayout>
      <AppHeader />
      <div
        className={classNames(
          "w-full md:max-w-screen-md grid grid-rows-autoRepeat3 justify-items-center gap-y-6",
          "text-left md:text-center mt-12 lg:mt-24 md:mx-auto"
        )}
      >
        {renderHeadline()}
        {renderTagline()}
        <div className="mt-6 md:mt-8 w-full md:w-56">
          <Button variant="contained" color="primary" fullWidth>
            Post a playlist
          </Button>
        </div>
      </div>
      <div className="mt-12 lg:mt-14 grid grid-cols-1 lg:grid-cols-[2fr_1fr] lg:gap-x-4">
        {renderPlaylistOverview()}
      </div>
    </PageLayout>
  );
};

export default Community;

import React, { useState } from "react";
import classNames from "classnames";

import type { IRenderLabel } from "../../components/Select";

import {
  AppleMusicIcon,
  ArrowDownIcon,
  AudiomackIcon,
  BoomplayIcon,
  DeezerIcon,
  SpotifyIcon,
} from "../../components/icons";
import { Select, Option } from "../../components/Select";
import { Space } from "../../components/Space";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "../../components/Table";
import { Pagination } from "../../components/Table/Pagination";
import { Button } from "../../components/Button";
import useMediaQuery, { screens } from "../../hooks/useMediaQuery";
import { Drawer } from "../../components/Drawer";
import { PlaylistConvertedModal } from "../../components/PlaylistConvertedModal";
import { Platform } from "../../../utils/platform";

export const Playlists: React.FC<{}> = () => {
  const matches = useMediaQuery(`(max-width: ${screens.lg})`);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [isMobileConverterOpen, setIsMobileConverterOpen] = useState(false);

  const renderLabel = (opts: Parameters<IRenderLabel<Platform>>[0]) => {
    const getIcon = () => {
      switch (opts.value) {
        case Platform.Spotify:
          return <SpotifyIcon key="spotify" />;
        case Platform.Deezer:
          return <DeezerIcon key="deezer" />;
        default:
          return <BoomplayIcon key="boomplay" />;
      }
    };

    return (
      <Space>
        {getIcon()}
        <span>{opts.label}</span>
      </Space>
    );
  };

  const renderOptions = () => {
    return (
      <>
        <Option value="spotify" label="Spotify">
          <Space>
            <SpotifyIcon />
            <span>Spotify</span>
          </Space>
        </Option>
        <Option value="appleMusic" label="Apple Music">
          <Space>
            <AppleMusicIcon />
            <span>Apple Music</span>
          </Space>
        </Option>
        <Option value="audiomack" label="Audiomack">
          <Space>
            <AudiomackIcon />
            <span>Audiomack</span>
          </Space>
        </Option>
        <Option value="deezer" label="Deezer">
          <Space>
            <DeezerIcon />
            <span>Deezer</span>
          </Space>
        </Option>
        <Option value="boomplay" label="Boomplay">
          <Space>
            <BoomplayIcon />
            <span>Boomplay</span>
          </Space>
        </Option>
      </>
    );
  };

  const renderConverterHeader = () => {
    return (
      <div>
        <div className="flex items-center lg:hidden">
          <Button
            variant="transparent"
            onClick={() => setIsMobileConverterOpen(false)}
          >
            <ArrowDownIcon className="rotate-90" color="#ABA6A6" />
            <span className="ml-2 text-primaryGray">Back</span>
          </Button>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-36 h-36 bg-secondary mr-4" />
          <div className="grid grid-cols-1 grid-rows-4 gap-y-2">
            <div className="flex items-center">
              <AppleMusicIcon />
              <span className="ml-2 text-sm">Apple music</span>
            </div>
            <div>
              <span className="text-primaryGray">Posted by :</span>
              <span>Skull face</span>
            </div>
            <span>Drip or Drown</span>
            <span className="text-primaryGray">30 songs, 4 hours</span>
          </div>
        </div>
      </div>
    );
  };

  const renderConverterBody = () => {
    return (
      <Table
        stickyHeader
        classes={{ container: "border-none text-sm", table: "min-w-0" }}
      >
        <TableHead>
          <TableRow>
            <TableCell className="px-0">Title</TableCell>
            <TableCell align="right" className="px-0">
              Length
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="px-0">
              <div className="flex items-center">
                <span>1</span>
                <div className="w-10 h-10 bg-secondary rounded-sm mx-3" />
                <div>
                  <h5>Hate the game</h5>
                  <p className="mt-1 text-primaryGray">Young thug</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="px-0" align="right">
              4:20
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="p-0" colSpan={4}>
              <div className="min-h-[54px] relative flex justify-start md:justify-end pl-6 items-center">
                <Pagination
                  total={50}
                  classes={{ pageSizeOptionsSelect: "!border-lightGray" }}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  };

  const renderConverterFooter = () => {
    return (
      <div
        className={classNames(
          "grid grid-rows-2 gap-y-4 items-start",
          "lg:grid-rows-1 lg:grid-cols-2 lg:gap-x-3 lg:gap-y-0 lg:items-end"
        )}
      >
        <Select
          theme="dark"
          placeholder="select platform"
          label="Convert playlist to"
          renderLabel={renderLabel}
          fullWidth
          classes={{ label: "text-sm" }}
        >
          {renderOptions()}
        </Select>
        <Button variant="contained" color="primary" fullWidth>
          Convert
        </Button>
      </div>
    );
  };

  const renderConverter = () => {
    return (
      <div className="w-full">
        {renderConverterHeader()}
        <div className="border border-t-1 border-lightGray my-5 w-full" />
        {renderConverterBody()}
        <div className="border border-t-1 border-lightGray my-5 w-full" />
        {renderConverterFooter()}
      </div>
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
            classes={{ select: "!w-[16ch]" }}
          >
            <Option value="general">General</Option>
            <Option value="hippop">Hip pop</Option>
            <Option value="afro">Afro pop</Option>
          </Select>
        </div>
        <Table
          stickyHeader
          classes={{ container: "border-t-0 rounded-t-none" }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Cover</TableCell>
              <TableCell>Poster</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Streaming service</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow onClick={() => setIsMobileConverterOpen(true)}>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-secondaryAlpha rounded-sm mr-2" />
                  <span>Drip or down</span>
                </div>
              </TableCell>
              <TableCell>Skull face</TableCell>
              <TableCell>General</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <AppleMusicIcon />
                  <span className="ml-2">Apple music</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="p-0" colSpan={4}>
                <div className="min-h-[54px] relative flex justify-start md:justify-end pl-6 pr-3 items-center">
                  <Pagination
                    total={500}
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    onChange={(value) => setPagination(value)}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  };

  const renderPlaylistConvertedModal = () => {
    return (
      <PlaylistConvertedModal
        open={false}
        link="https://react.dev/learn/you-might-not-need-an-effect"
        fromPlatform="Spotify"
        toPlatform="Apple Music"
        onClose={() => {}}
      />
    );
  };

  return (
    <div className="mt-12 xl:mt-14 grid grid-cols-1 lg:grid-cols-[2fr_1fr] lg:gap-x-4">
      {renderPlaylistOverview()}
      <div className="hidden lg:block lg:bg-secondaryAlpha lg:rounded-md p-4">
        {renderConverter()}
      </div>
      {matches && (
        <Drawer
          open={isMobileConverterOpen}
          placement="bottom"
          classes={{
            contentContainer: "!bg-secondary rounded-t-md p-4",
          }}
          onClose={() => setIsMobileConverterOpen(false)}
        >
          {renderConverter()}
        </Drawer>
      )}
      {renderPlaylistConvertedModal()}
    </div>
  );
};

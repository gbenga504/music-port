import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import omit from "lodash/omit";

import type { IRenderLabel } from "../../components/Select";
import type { ICreateApiClient } from "../../api";
import type { IPaginationOpts } from "../../components/Table/Pagination";

import {
  AppleMusicIcon,
  ArrowDownIcon,
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
import {
  Platform,
  PlatformValues,
  PlaylistGenre,
  PlaylistGenreValues,
} from "../../../utils/platform";
import useParsedQueryParams from "../../hooks/useParsedQueryParams";
import { constructURL } from "../../../utils/url";
import { routeIds } from "../../routes";

interface IProps {
  playlists: Awaited<ReturnType<ICreateApiClient["playlist"]["getPlaylists"]>>;
}

export const Playlists: React.FC<IProps> = ({ playlists }) => {
  const [query] = useParsedQueryParams<{
    currentPage: string;
    pageSize: string;
    genre: string;
  }>();
  const navigate = useNavigate();
  const matches = useMediaQuery(`(max-width: ${screens.lg})`);
  const [isMobileConverterOpen, setIsMobileConverterOpen] = useState(false);

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case Platform.Spotify:
        return <SpotifyIcon />;
      case Platform.Deezer:
        return <DeezerIcon />;
      default:
        return <AppleMusicIcon />;
    }
  };

  const handlePlaylistsFilterChange = (
    changeset: IPaginationOpts & { genre?: PlaylistGenre }
  ) => {
    navigate(
      constructURL({
        routeId: routeIds.community,
        query: {
          ...query,
          ...omit(changeset, "current"),
          pageSize: changeset.pageSize.toString(),
          currentPage: changeset.current.toString(),
        },
      }),
      { replace: true }
    );
  };

  const renderLabel = (opts: Parameters<IRenderLabel<Platform>>[0]) => {
    return (
      <Space>
        {getPlatformIcon(opts.value)}
        <span>{opts.label}</span>
      </Space>
    );
  };

  const renderOptions = () => {
    return PlatformValues.map((platform) => (
      <Option key={platform} value={platform} label={platform}>
        <Space>
          {getPlatformIcon(platform)}
          <span>{platform}</span>
        </Space>
      </Option>
    ));
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
              {getPlatformIcon(Platform.Deezer)}
              <span className="ml-2 text-sm">Deezer</span>
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
        classes={{
          container: "border-none text-sm",
          table: "min-w-0",
          loadingContainer: "!bg-secondaryAlpha200",
        }}
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
            onChange={(value) =>
              handlePlaylistsFilterChange({
                genre: value as PlaylistGenre,
                current: 1,
                pageSize: 10,
              })
            }
            value={query.genre}
          >
            {PlaylistGenreValues.map((genre) => (
              <Option value={genre} key={genre}>
                {genre}
              </Option>
            ))}
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
            {playlists.data.map((playlist) => (
              <TableRow
                key={playlist.id}
                onClick={() => setIsMobileConverterOpen(true)}
              >
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-secondaryAlpha rounded-sm mr-2">
                      {playlist.coverImage && (
                        <img
                          src={playlist.coverImage}
                          className="w-full h-full rounded-sm"
                        />
                      )}
                    </div>
                    <span>{playlist.name}</span>
                  </div>
                </TableCell>
                <TableCell>{playlist.owner.name}</TableCell>
                <TableCell className="capitalize">{playlist.genre}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getPlatformIcon(playlist.platform as unknown as Platform)}
                    <span className="ml-2 capitalize">{playlist.platform}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="p-0" colSpan={4}>
                <div className="min-h-[54px] relative flex justify-start md:justify-end pl-6 pr-3 items-center">
                  <Pagination
                    total={playlists.total || 0}
                    current={Number(query.currentPage)}
                    pageSize={Number(query.pageSize)}
                    onChange={(value) => handlePlaylistsFilterChange(value)}
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

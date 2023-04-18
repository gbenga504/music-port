import React, { useEffect, useState } from "react";
import classNames from "classnames";

import type { IRenderLabel } from "../../components/Select";

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
import { IPaginationOpts, Pagination } from "../../components/Table/Pagination";
import { Button } from "../../components/Button";
import useMediaQuery, { screens } from "../../hooks/useMediaQuery";
import { Drawer } from "../../components/Drawer";
import { PlaylistConvertedModal } from "../../components/PlaylistConvertedModal";
import { Platform, PlatformValues } from "../../../utils/platform";
import { loadData } from "./loadData";
import { useApi } from "../../context/ApiContext";
import { ICreateApiClient } from "../../api";

interface IProps {
  playlist:
    | Awaited<ReturnType<typeof loadData>>["playlists"]["data"][number]
    | null;
  onResetPlaylist: () => void;
}

type Songs = Awaited<
  ReturnType<ICreateApiClient["playlist"]["getPlaylistSongs"]>
>;

export const ConvertPlaylist: React.FC<IProps> = ({
  playlist,
  onResetPlaylist,
}) => {
  const matches = useMediaQuery(`(max-width: ${screens.lg})`);
  const api = useApi();
  const [songs, setSongs] = useState<Songs | null>(null);
  const [isSongsLoading, setIsSongsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      if (playlist) {
        loadSongs({ current: 1, pageSize: 5 });
      }
    })();
  }, [playlist]);

  async function loadSongs(paginationOpts: IPaginationOpts) {
    setIsSongsLoading(true);

    const result = await api.playlist.getPlaylistSongs({
      playlistId: playlist!.id,
      currentPage: paginationOpts.current,
      pageSize: paginationOpts.pageSize,
    });

    setIsSongsLoading(false);
    setSongs(result);
  }

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

  const composeArtistsNames = (
    artists: Songs["data"][number]["artists"]
  ): string => {
    return artists.reduce((acc, artist) => {
      if (acc.length !== 0) {
        acc += ",";
      }

      acc += artist.name;

      return acc;
    }, "");
  };

  const calculateDuration = (duration: number): string => {
    const oneMinute = 1000 * 60;
    const minute = Math.floor(duration / oneMinute);
    const seconds = Math.floor((duration % oneMinute) / 1000);

    return `${minute}:${seconds}`;
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
      playlist && (
        <div>
          <div className="flex items-center lg:hidden">
            <Button variant="transparent" onClick={() => onResetPlaylist()}>
              <ArrowDownIcon className="rotate-90" color="#ABA6A6" />
              <span className="ml-2 text-primaryGray">Back</span>
            </Button>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-36 h-36 bg-secondary mr-4 rounded-sm">
              {playlist.coverImage && (
                <img
                  src={playlist.coverImage}
                  className="w-full h-full rounded-sm"
                />
              )}
            </div>
            <div className="grid grid-cols-1 grid-rows-4 gap-y-2">
              <div className="flex items-center">
                {getPlatformIcon(playlist.platform as unknown as Platform)}
                <span className="ml-2 text-sm capitalize">
                  {playlist.platform}
                </span>
              </div>
              <div>
                <span className="text-primaryGray">Posted by: </span>
                <span>{playlist.owner.name}</span>
              </div>
              <span>{playlist.name}</span>
              <span className="text-primaryGray">
                {playlist.totalNumberOfSongs} songs, ~
                {Math.ceil(playlist.duration / 3600000)} hours
              </span>
            </div>
          </div>
        </div>
      )
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
        loading={isSongsLoading}
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
          {songs &&
            songs.data.map((song, index) => (
              <TableRow key={`${song.name}${index}`}>
                <TableCell className="px-0">
                  <div className="flex items-center">
                    <span>
                      {(songs.currentPage - 1) * songs.pageSize + index + 1}
                    </span>
                    <div className="w-10 h-10 bg-secondary rounded-sm mx-3">
                      {song.coverImage && (
                        <img
                          src={song.coverImage}
                          className="rounded-sm w-full h-full"
                        />
                      )}
                    </div>
                    <div>
                      <h5>{song.name}</h5>
                      <p className="mt-1 text-primaryGray">
                        {composeArtistsNames(song.artists)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-0" align="right">
                  {calculateDuration(song.duration)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="p-0" colSpan={4}>
              <div className="min-h-[54px] relative flex justify-start md:justify-end pl-6 items-center">
                <Pagination
                  total={songs?.total || 0}
                  current={songs?.currentPage || 1}
                  pageSize={songs?.pageSize || 5}
                  pageSizeOptions={[5]}
                  onChange={(value) => loadSongs(value)}
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
    if (playlist) {
      return (
        <div className="w-full">
          {renderConverterHeader()}
          <div className="border border-t-1 border-lightGray my-5 w-full" />
          {renderConverterBody()}
          <div className="border border-t-1 border-lightGray my-5 w-full" />
          {renderConverterFooter()}
        </div>
      );
    }

    return (
      <div className="w-full h-full flex justify-center items-center">
        <h3>Oops! You need to select a playlist</h3>
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
    <>
      <div className="hidden lg:block lg:bg-secondaryAlpha lg:rounded-md p-4">
        {renderConverter()}
      </div>
      {matches && (
        <Drawer
          open={Boolean(playlist)}
          placement="bottom"
          classes={{
            contentContainer: "!bg-secondary rounded-t-md p-4",
          }}
          onClose={() => onResetPlaylist()}
        >
          {renderConverter()}
        </Drawer>
      )}
      {renderPlaylistConvertedModal()}
    </>
  );
};

import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import omit from "lodash/omit";

import type { ILoadableComponentProps } from "../../../utils/route-utils";
import type { IPaginationOpts } from "../../components/Table/Pagination";
import { PlaylistGenre } from "../../../utils/platform";
import type { IPageQuery } from "./loadData";

import { AppHeader } from "../../components/AppHeader";
import { Button } from "../../components/Button/Button";
import { PageLayout } from "../../components/PageLayout";
import { ConvertPlaylist } from "./ConvertPlaylist";
import { CreatePlaylistModal } from "./CreatePlaylistModal";
import { HeadMarkup } from "../../components/HeadMarkup";
import { Option, Select } from "../../components/Select";
import { PlaylistGenreValues, Platform } from "../../../utils/platform";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "../../components/Table";
import { constructURL } from "../../../utils/url";
import { routeIds } from "../../routes";
import { Pagination } from "../../components/Table/Pagination";
import { loadData } from "./loadData";
import { PlatformIcon } from "../../components/PlatformIcon";
import { convertCamelCaseToCapitalize } from "../../../utils/formatter";

type Playlist = Awaited<
  ReturnType<typeof loadData>
>["playlists"]["data"][number];

const Community: React.FC<
  ILoadableComponentProps<Awaited<ReturnType<typeof loadData>>, IPageQuery>
> = ({ query, pageData }) => {
  const { isAuthTokenAvailableForCreatingPlaylist } = query;
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(
    isAuthTokenAvailableForCreatingPlaylist === "true"
  );
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    getInitialSelectedPlaylist()
  );
  const navigate = useNavigate();

  function getInitialSelectedPlaylist(): Playlist | null {
    const playlist = pageData.playlists.data.find(
      (playlist) => playlist.id === query.selectedPlaylistId
    );

    return playlist ?? null;
  }

  const handlePlaylistsFilterChange = (
    changeset: IPaginationOpts & { genre?: PlaylistGenre }
  ) => {
    navigate(
      constructURL({
        routeId: routeIds.community,
        query: {
          ...query,
          ...omit(changeset, "current"),
          genre:
            changeset?.genre === PlaylistGenre.ALL
              ? undefined
              : changeset?.genre,
          pageSize: changeset.pageSize.toString(),
          currentPage: changeset.current.toString(),
        },
      })
    );
  };

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

  const renderPlaylists = () => {
    return (
      <div className="w-full">
        <div className="w-full rounded-t-md border border-lightGray p-4 flex justify-between items-center">
          <span>Playlist overview</span>
          <Select
            placeholder="Filter by Genre"
            size="small"
            theme="dark"
            classes={{ select: "!w-[16ch]" }}
            onChange={(value) => {
              setSelectedPlaylist(null);

              handlePlaylistsFilterChange({
                genre: value as PlaylistGenre,
                current: 1,
                pageSize: 10,
              });
            }}
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
            {pageData.playlists.data.map((playlist) => (
              <TableRow
                key={playlist.id}
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-secondaryAlpha rounded-sm mr-2">
                      {playlist.coverImage && (
                        <img
                          src={playlist.coverImage}
                          className="w-full h-full rounded-sm object-cover"
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
                    <PlatformIcon
                      platform={playlist.platform as unknown as Platform}
                    />
                    <span className="ml-2 capitalize">
                      {convertCamelCaseToCapitalize(playlist.platform)}
                    </span>
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
                    total={pageData.playlists.total || 0}
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

  return (
    <PageLayout title="Hey">
      <HeadMarkup title="Community | Discover a world of music" />
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setIsCreatePlaylistModalOpen(true)}
          >
            Post a playlist
          </Button>
        </div>
      </div>
      <div className="mt-12 xl:mt-14 grid grid-cols-1 lg:grid-cols-[2fr_1fr] lg:gap-x-4">
        {renderPlaylists()}
        <ConvertPlaylist
          playlist={selectedPlaylist}
          onResetPlaylist={() => setSelectedPlaylist(null)}
        />
      </div>
      <CreatePlaylistModal
        open={isCreatePlaylistModalOpen}
        onClose={() => setIsCreatePlaylistModalOpen(false)}
      />
    </PageLayout>
  );
};

export default Community;

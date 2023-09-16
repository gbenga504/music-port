import classNames from "classnames";
import { omit } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";

import { loadData } from "./loadData";

import * as formValidation from "../../../utils/form-validation";
import { convertCamelCaseToCapitalize } from "../../../utils/formatter";
import { Platform, PlatformValues } from "../../../utils/platform";
import { Button } from "../../components/Button/Button";
import { Select, Option } from "../../components/Select";
import { ArrowDownIcon } from "../../components/icons";
import type { IPageQuery } from "./loadData";
import type { ICreateApiClient } from "../../api";
import type { IRenderLabel } from "../../components/Select";
import type { IPaginationOpts } from "../../components/Table/Pagination";

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
import useMediaQuery, { screens } from "../../hooks/useMediaQuery";
import { Drawer } from "../../components/Drawer";
import { PlaylistConvertedModal } from "../../components/PlaylistConvertedModal";


import { useApi } from "../../context/ApiContext";
import useParsedQueryParams from "../../hooks/useParsedQueryParams";
import { useToast } from "../../components/Toast/ToastContext";
import { constructURL } from "../../../utils/url";
import { routeIds } from "../../routes";
import { PlatformIcon } from "../../components/PlatformIcon";

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
  const toast = useToast();
  const navigate = useNavigate();
  const [query] = useParsedQueryParams<IPageQuery>();
  const [songs, setSongs] = useState<Songs | null>(null);
  const [isConvertingPlaylist, setIsConvertingPlaylist] = useState(false);
  const [playlistURL, setPlaylistURL] = useState<string | null>(null);
  const [isSongsLoading, setIsSongsLoading] = useState(false);
  const requestSent = useRef(false);

  useEffect(() => {
    (async function () {
      if (playlist) {
        loadSongs({ current: 1, pageSize: 5 });
      }
    })();
  }, [playlist]);

  useEffect(() => {
    (async function () {
      const { isAuthTokenAvailableForConvertingPlaylist, platform } = query;

      if (
        isAuthTokenAvailableForConvertingPlaylist === "true" &&
        !requestSent.current &&
        playlist &&
        platform
      ) {
        requestSent.current = true;
        setIsConvertingPlaylist(true);

        const result = await api.playlist.convertPlaylist({
          platform,
          exportId: playlist.exportId,
        });

        setIsConvertingPlaylist(false);

        if (result.error) {
          toast({
            title: result.error.name,
            description: result.error.message,
            status: "error",
          });
        }

        if (result.data) {
          setPlaylistURL(result.data.url);
        }
      }
    })();
  }, [query]);

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

  const composeArtistsNames = (
    artists: Songs["data"][number]["artists"]
  ): string => {
    return artists.reduce((acc, artist) => {
      if (acc.length > 0) {
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

  const handleSubmitFormValues = (
    values: formValidation.convertPlaylistFormInputs
  ) => {
    const redirectURI = constructURL({
      routeId: routeIds.community,
      query: {
        ...query,
        ...values,
        isAuthTokenAvailableForConvertingPlaylist: "true",
        selectedPlaylistId: playlist?.id || "",
      },
    });

    try {
      location.href = `/api/auth/${
        values.platform
      }?redirect_uri=${encodeURIComponent(redirectURI)}`;
    } catch (error) {
      const { name, message } = error as Error;

      toast({
        title: name,
        description: message,
        status: "error",
        position: "bottom-right",
      });
    }
  };

  const renderLabel = (opts: Parameters<IRenderLabel<Platform>>[0]) => {
    return (
      <Space>
        <PlatformIcon platform={opts.value} />
        <span>{opts.label}</span>
      </Space>
    );
  };

  const renderOptions = () => {
    return PlatformValues.map((platform) => (
      <Option
        key={platform}
        value={platform}
        label={convertCamelCaseToCapitalize(platform)}
      >
        <Space>
          <PlatformIcon platform={platform} />
          <span>{convertCamelCaseToCapitalize(platform)}</span>
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
                  className="w-full h-full rounded-sm object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-1 grid-rows-4 gap-y-2">
              <div className="flex items-center">
                <PlatformIcon
                  platform={playlist.platform as unknown as Platform}
                />
                <span className="ml-2 text-sm capitalize">
                  {convertCamelCaseToCapitalize(playlist.platform)}
                </span>
              </div>
              <div>
                <span className="text-primaryGray">Posted by: </span>
                <span>{playlist.owner.name}</span>
              </div>
              <span>{playlist.name}</span>
              <span className="text-primaryGray">
                {playlist.totalNumberOfSongs} songs, ~
                {Math.ceil(playlist.duration / 3_600_000)} hours
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
                          className="rounded-sm w-full h-full object-cover"
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
      <Form
        onSubmit={handleSubmitFormValues}
        initialValues={{
          platform: query.platform,
        }}
        validate={formValidation.validateConvertPlaylistForm}
        subscription={{ dirty: true, invalid: true, error: true }}
        render={({ handleSubmit, form }) => {
          const { invalid, dirtyFieldsSinceLastSubmit } = form.getState();

          const dirty = Object.values(dirtyFieldsSinceLastSubmit).reduce(
            (acc, value) => acc && value,
            true
          );

          return (
            <form
              onSubmit={handleSubmit}
              className={classNames(
                "grid grid-rows-2 gap-y-4 items-start",
                "lg:grid-rows-1 lg:grid-cols-2 lg:gap-x-3 lg:gap-y-0 lg:items-end"
              )}
            >
              <Field
                name="platform"
                render={({ input, meta }) => (
                  <Select
                    theme="dark"
                    placeholder="select platform"
                    label="Convert playlist to"
                    renderLabel={renderLabel}
                    fullWidth
                    classes={{ label: "text-sm" }}
                    helperText={meta.dirty && meta.error}
                    error={Boolean(meta.error && meta.dirty)}
                    {...input}
                  >
                    {renderOptions()}
                  </Select>
                )}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                htmlType="submit"
                disabled={invalid || !dirty}
                loading={isConvertingPlaylist}
                loadingText="Converting..."
              >
                Convert
              </Button>
            </form>
          );
        }}
      />
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
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img src="public/images/embarrased.png" width={64} height={64} />
        <h3>You need to select a playlist</h3>
      </div>
    );
  };

  const renderPlaylistConvertedModal = () => {
    return (
      <PlaylistConvertedModal
        open={Boolean(playlistURL)}
        link={playlistURL}
        fromPlatform={playlist?.platform!}
        toPlatform={query.platform!}
        onClose={() => {
          navigate(
            constructURL({
              routeId: routeIds.community,
              query: {
                ...omit(query, ["isAuthTokenAvailableForConvertingPlaylist"]),
              },
            }),
            { replace: true }
          );

          setPlaylistURL(null);
        }}
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

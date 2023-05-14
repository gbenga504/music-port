import React, { useEffect, useState, useRef } from "react";
import { Field, Form } from "react-final-form";
import omit from "lodash/omit";
import { useNavigate } from "react-router-dom";

import type { IRenderLabel } from "../../components/Select";
import type { FormRenderProps } from "react-final-form";
import type { ChangeEventHandler } from "react";

import { Modal } from "../../components/Modal";
import { Option, Select } from "../../components/Select";
import {
  AppleMusicIcon,
  DeezerIcon,
  SpotifyIcon,
} from "../../components/icons";
import { Space } from "../../components/Space";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import {
  Platform,
  PlatformValues,
  PlaylistGenreValues,
} from "../../../utils/platform";
import useParsedQueryParams from "../../hooks/useParsedQueryParams";
import * as formValidation from "../../../utils/form-validation";
import { constructURL, getPlatformName } from "../../../utils/url";
import { routeIds } from "../../routes";
import { useToast } from "../../components/Toast/ToastContext";
import { useApi } from "../../context/ApiContext";
import { IPageQuery } from "./loadData";
import { sleep } from "../../../utils/sleep";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const CreatePlaylistModal: React.FC<IProps> = ({ open, onClose }) => {
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const toast = useToast();
  const api = useApi();
  const [query] = useParsedQueryParams<IPageQuery>();
  const navigate = useNavigate();
  const requestSent = useRef(false);

  useEffect(() => {
    (async function () {
      const {
        author,
        playlistLink,
        playlistGenre,
        streamingService,
        isAuthTokenAvailableForCreatingPlaylist,
      } = query;

      if (
        isAuthTokenAvailableForCreatingPlaylist === "true" &&
        !requestSent.current
      ) {
        requestSent.current = true;
        setIsCreatingPlaylist(true);

        const result = await api.playlist.createPlaylist({
          author: author!,
          playlistLink: playlistLink!,
          playlistGenre: playlistGenre!,
          platform: streamingService!,
        });

        setIsCreatingPlaylist(false);

        if (result.error) {
          toast({
            title: result.error.name,
            description: result.error.message,
            status: "error",
          });
        }

        if (result.data) {
          toast({
            title: "Playlist created",
            description: `Your playlist (${result.data.name}) has been created`,
            status: "success",
            duration: 4000,
          });

          await sleep(4000);

          onClose();

          navigate(
            constructURL({
              routeId: routeIds.community,
            }),
            { replace: true }
          );
        }
      }
    })();
  }, [query]);

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

  const handleSubmitFormValues = (
    values: formValidation.createPlaylistFormInputs
  ) => {
    const redirectURI = constructURL({
      routeId: routeIds.community,
      query: {
        ...values,
        ...query,
        playlistLink: encodeURIComponent(values.playlistLink),
        isAuthTokenAvailableForCreatingPlaylist: "true",
      },
    });

    try {
      location.href = `/api/auth/${
        values.streamingService
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

  const handlePlaylistLinkChange = (
    form: FormRenderProps<formValidation.createPlaylistFormInputs>["form"]
  ) => {
    return function (evt) {
      const link = evt.target.value;
      const platformName = getPlatformName(link);

      form.batch(() => {
        form.change("playlistLink", link);
        form.change("streamingService", platformName ?? undefined);
      });
    } as ChangeEventHandler<HTMLInputElement>;
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
      <Option value={platform} label={platform} key={platform}>
        <Space>
          {getPlatformIcon(platform)}
          <span>{platform}</span>
        </Space>
      </Option>
    ));
  };

  return (
    <Modal open={open} onClose={onClose} title="Post a playlist">
      <Form
        onSubmit={handleSubmitFormValues}
        initialValues={{
          author: query.author,
          playlistLink: query.playlistLink,
          playlistGenre: query.playlistGenre,
          streamingService: query.streamingService,
        }}
        validate={formValidation.validateCreatePlaylistForm}
        subscription={{ dirty: true, invalid: true, error: true }}
        render={({ handleSubmit, form }) => {
          const { invalid, dirtyFieldsSinceLastSubmit } = form.getState();

          const dirty = Object.values(dirtyFieldsSinceLastSubmit).reduce(
            (acc, value) => acc && value,
            true
          );

          return (
            <form onSubmit={handleSubmit}>
              <div className="my-8 grid grid-rows-4 gap-y-8">
                <Field
                  name="author"
                  render={({ input, meta }) => (
                    <Input
                      fullWidth
                      label="Your Name"
                      placeholder="E.g John Doe"
                      required
                      helperText={meta.dirty && meta.error}
                      error={Boolean(meta.error && meta.dirty)}
                      {...input}
                    />
                  )}
                />
                <Field
                  name="playlistLink"
                  render={({ input, meta }) => (
                    <Input
                      fullWidth
                      label="Playlist link"
                      placeholder="E.g https://open.spotify.com/playlist/id"
                      required
                      helperText={meta.dirty && meta.error}
                      error={Boolean(meta.error && meta.dirty)}
                      onChange={handlePlaylistLinkChange(form)}
                      {...omit(input, "onChange")}
                    />
                  )}
                />
                <Field
                  name="playlistGenre"
                  render={({ input, meta }) => (
                    <Select
                      fullWidth
                      label="Playlist genre"
                      required
                      placeholder="Select a genre"
                      helperText={meta.dirty && meta.error}
                      error={Boolean(meta.error && meta.dirty)}
                      {...input}
                    >
                      {PlaylistGenreValues.map((genre) => (
                        <Option value={genre} key={genre}>
                          {genre}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                <Field
                  name="streamingService"
                  render={({ input, meta }) => (
                    <Select
                      fullWidth
                      label="Streaming service"
                      required
                      placeholder="Streaming service auto generated"
                      renderLabel={renderLabel}
                      disabled
                      helperText={meta.dirty && meta.error}
                      error={Boolean(meta.error && meta.dirty)}
                      {...input}
                    >
                      {renderOptions()}
                    </Select>
                  )}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                htmlType="submit"
                disabled={invalid || !dirty}
                loadingText="Posting..."
                loading={isCreatingPlaylist}
              >
                Post playlist
              </Button>
            </form>
          );
        }}
      />
    </Modal>
  );
};

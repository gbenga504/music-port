import omit from "lodash/omit";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useLocation } from "react-router-dom";

import {
  REVIEW_PLAYLIST_MODAL_LOCAL_STORAGE_KEY,
  parseCreatePlaylist,
} from "./utils";

import { convertCamelCaseToCapitalize } from "../../../utils/formatter";
import { PlaylistPlatformValues } from "../../../utils/platform";
import { getPlatformName } from "../../../utils/url";
import { useGlobalPageData } from "../../context/GlobalPageDataContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modal/Modal";
import { PlatformIcon } from "../PlatformIcon";
import { Option, Select } from "../Select/Select";
import { Space } from "../Space";

import type { CreatePlaylist } from "./utils";
import type { PlaylistPlatform } from "../../api/graphql/graphql-client.gen";
import type { IRenderLabel } from "../Select/Select";
import type { ChangeEvent } from "react";
import type { FormRenderProps } from "react-final-form";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const CreatePlaylistModal: React.FC<IProps> = ({ open, onClose }) => {
  const [_, setReviewPlaylistModalData] = useLocalStorage<
    Record<string, unknown>
  >(REVIEW_PLAYLIST_MODAL_LOCAL_STORAGE_KEY, {});
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const { genres } = useGlobalPageData();

  const handleClose = () => {
    onClose();
  };

  const handleSubmitFormValues = (values: CreatePlaylist) => {
    setReviewPlaylistModalData({
      ...values,
      playlistLink: values.playlistLink,
    });

    // TODO: We want to do this properly
    // Basically we want to keep the existing search params on this page
    // except the createPlaylist search params while adding the reviewPlaylist
    // search params
    const redirectURI = `${pathname}?reviewPlaylist=true`;

    setIsLoading(true);
    location.href = `/api/auth/${
      values.streamingService
    }?redirect_uri=${encodeURIComponent(redirectURI)}`;
  };

  const handlePlaylistLinkChange = (
    form: FormRenderProps<CreatePlaylist>["form"]
  ) => {
    return function (evt: ChangeEvent<HTMLInputElement>) {
      const link = evt.target.value;
      const platformName = getPlatformName(link);

      form.batch(() => {
        form.change("playlistLink", link);
        form.change("streamingService", platformName ?? undefined);
      });
    };
  };

  const renderLabel = (opts: Parameters<IRenderLabel<PlaylistPlatform>>[0]) => {
    return (
      <Space>
        <PlatformIcon platform={opts.value} />
        <span>{opts.label}</span>
      </Space>
    );
  };

  const renderOptions = () => {
    return PlaylistPlatformValues.map((platform) => (
      <Option
        value={platform}
        label={convertCamelCaseToCapitalize(platform)}
        key={platform}
      >
        <Space>
          <PlatformIcon platform={platform} />
          <span>{convertCamelCaseToCapitalize(platform)}</span>
        </Space>
      </Option>
    ));
  };

  return (
    <Modal open={open} onClose={handleClose} title="Post a playlist">
      <Form
        onSubmit={handleSubmitFormValues}
        validate={parseCreatePlaylist}
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
                  name="playlistGenreId"
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
                      {genres.map((genre) => (
                        <Option value={genre.id} key={genre.id}>
                          {genre.name}
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
                disabled={invalid || !dirty || isLoading}
                loading={isLoading}
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

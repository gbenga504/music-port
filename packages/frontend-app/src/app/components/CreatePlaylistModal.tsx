import omit from "lodash/omit";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";

import { Button } from "./Button/Button";
import { Input } from "./Input/Input";
import { Modal } from "./Modal/Modal";
import { PlatformIcon } from "./PlatformIcon";
import { PlaylistAction } from "./ReviewPlaylistModal/types";
import { Option, Select } from "./Select/Select";
import { Space } from "./Space";

import * as formValidation from "../../utils/form-validation";
import { convertCamelCaseToCapitalize } from "../../utils/formatter";
import {
  PlaylistPlatformValues,
  PlaylistGenreValues,
} from "../../utils/platform";
import { constructURL, getPlatformName } from "../../utils/url";
import useParsedQueryParams from "../hooks/useParsedQueryParams";
import { routeIds } from "../routes";

import type { IRenderLabel } from "./Select/Select";
import type { PlaylistPlatform } from "../api/graphql/graphql-client.gen";
import type { IPageQuery } from "../pages/Community/load-data";
import type { ChangeEvent } from "react";
import type { FormRenderProps } from "react-final-form";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const CreatePlaylistModal: React.FC<IProps> = ({ open, onClose }) => {
  const [query] = useParsedQueryParams<IPageQuery>();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSubmitFormValues = (
    values: formValidation.createPlaylistFormInputs
  ) => {
    const redirectURI = constructURL({
      routeId: routeIds.discoverPage,
      query: {
        ...values,
        playlistLink: encodeURIComponent(values.playlistLink),
        reviewPlaylist: "true",
        action: PlaylistAction.CREATE_PLAYLIST,
      },
    });

    setIsLoading(true);
    location.href = `/api/auth/${
      values.streamingService
    }?redirect_uri=${encodeURIComponent(redirectURI)}`;
  };

  const handlePlaylistLinkChange = (
    form: FormRenderProps<formValidation.createPlaylistFormInputs>["form"]
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

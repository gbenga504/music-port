import omit from "lodash/omit";
import React from "react";
import { Field, Form } from "react-final-form";

import { Button } from "./Button/Button";
import { Input } from "./Input";
import { Modal } from "./Modal/Modal";
import { PlatformIcon } from "./PlatformIcon";
import { Option, Select } from "./Select";
import { Space } from "./Space";

import * as formValidation from "../../utils/form-validation";
import { convertCamelCaseToCapitalize } from "../../utils/formatter";
import { PlatformValues, PlaylistGenreValues } from "../../utils/platform";
import { getPlatformName } from "../../utils/url";
import useParsedQueryParams from "../hooks/useParsedQueryParams";

import type { IRenderLabel } from "./Select";
import type { Platform } from "../../utils/platform";
import type { IPageQuery } from "../pages/Community/load-data";
import type { ChangeEventHandler } from "react";
import type { FormRenderProps } from "react-final-form";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const CreatePlaylistModal: React.FC<IProps> = ({ open, onClose }) => {
  const [query] = useParsedQueryParams<IPageQuery>();

  const handleClose = () => {
    onClose();
  };

  const handleSubmitFormValues = () =>
    // values: formValidation.createPlaylistFormInputs
    {};

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
        <PlatformIcon platform={opts.value} />
        <span>{opts.label}</span>
      </Space>
    );
  };

  const renderOptions = () => {
    return PlatformValues.map((platform) => (
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
                disabled={invalid || !dirty}
                loadingText="Posting..."
                // loading={isCreatingPlaylist}
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

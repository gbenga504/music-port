import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useLocation } from "react-router-dom";

import {
  PORT_PLAYLIST_MODAL_LOCAL_STORAGE_KEY,
  parseInitiatePortPlaylist,
} from "./utils";

import { convertCamelCaseToCapitalize } from "../../../../../../utils/formatter";
import { PlaylistPlatformValues } from "../../../../../../utils/platform";
import { Button } from "../../../../../components/Button/Button";
import { Modal } from "../../../../../components/Modal/Modal";
import { PlatformIcon } from "../../../../../components/PlatformIcon";
import { Option, Select } from "../../../../../components/Select/Select";
import { Space } from "../../../../../components/Space";
import { useLocalStorage } from "../../../../../hooks/useLocalStorage";

import type { InitiatePortPlaylist } from "./utils";
import type { PlaylistPlatform } from "../../../../../api/graphql/graphql-client.gen";
import type { IRenderLabel } from "../../../../../components/Select/Select";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const InitiatePortPlaylistModal: React.FC<IProps> = ({
  open,
  onClose,
}) => {
  const [_, setConvertPlaylistModalData] = useLocalStorage<
    Record<string, unknown>
  >(PORT_PLAYLIST_MODAL_LOCAL_STORAGE_KEY, {});
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  const handleClose = () => {
    onClose();
  };

  const handleSubmitFormValues = (values: InitiatePortPlaylist) => {
    setConvertPlaylistModalData(values);

    // TODO: We want to do this properly
    // Basically we want to keep the existing search params on this page
    const redirectURI = `${pathname}?portPlaylist=true`;

    setIsLoading(true);
    location.href = `/api/auth/${
      values.platform
    }?redirect_uri=${encodeURIComponent(redirectURI)}`;
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
    <Modal open={open} onClose={handleClose} title="Export this playlist">
      <Form
        onSubmit={handleSubmitFormValues}
        validate={parseInitiatePortPlaylist}
        subscription={{ dirty: true, invalid: true, error: true }}
        render={({ handleSubmit, form }) => {
          const { invalid, dirtyFieldsSinceLastSubmit } = form.getState();

          const dirty = Object.values(dirtyFieldsSinceLastSubmit).reduce(
            (acc, value) => acc && value,
            true
          );

          return (
            <form onSubmit={handleSubmit}>
              <div className="my-8">
                <Field
                  name="platform"
                  render={({ input, meta }) => (
                    <Select
                      fullWidth
                      label="Streaming service"
                      required
                      placeholder="Please select a streaming service"
                      renderLabel={renderLabel}
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
                Port playlist
              </Button>
            </form>
          );
        }}
      />
    </Modal>
  );
};

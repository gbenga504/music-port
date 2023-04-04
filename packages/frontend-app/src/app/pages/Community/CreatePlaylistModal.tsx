import React from "react";
import { Field, Form } from "react-final-form";

import type { IRenderLabel } from "../../components/Select";

import { Modal } from "../../components/Modal";
import { Option, Select } from "../../components/Select";
import {
  AppleMusicIcon,
  AudiomackIcon,
  BoomplayIcon,
  DeezerIcon,
  SpotifyIcon,
} from "../../components/icons";
import { Space } from "../../components/Space";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const CreatePlaylistModal: React.FC<IProps> = ({ open, onClose }) => {
  const renderLabel = (opts: Parameters<IRenderLabel>[0]) => {
    const getIcon = () => {
      switch (opts.value) {
        case "spotify":
          return <SpotifyIcon key="spotify" />;
        case "deezer":
          return <DeezerIcon key="deezer" />;
        case "appleMusic":
          return <AppleMusicIcon key="appleMusic" />;
        case "audiomack":
          return <AudiomackIcon key="audiomack" />;
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

  return (
    <Modal open={open} onClose={onClose} title="Post a playlist">
      <Form
        onSubmit={() => {}}
        subscription={{ dirty: true, invalid: true, error: true }}
        render={({ handleSubmit, form }) => {
          const { invalid, dirty } = form.getState();

          return (
            <form onSubmit={handleSubmit}>
              <div className="my-14 grid grid-rows-5 gap-y-8">
                <Field
                  name="name"
                  render={({ input, meta }) => (
                    <Input
                      fullWidth
                      label="Your Name"
                      required
                      helperText={meta.error}
                      error={Boolean(meta.error)}
                      {...input}
                    />
                  )}
                />
                <Field
                  name="playlistTitle"
                  render={({ input, meta }) => (
                    <Input
                      fullWidth
                      label="Title of playlist"
                      required
                      helperText={meta.error}
                      error={Boolean(meta.error)}
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
                      required
                      helperText={meta.error}
                      error={Boolean(meta.error)}
                      {...input}
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
                      helperText={meta.error}
                      error={Boolean(meta.error)}
                      {...input}
                    >
                      <Option value="rnb">Rnb</Option>
                      <Option value="afro">Afro</Option>
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
                      placeholder="Select a streaming service"
                      renderLabel={renderLabel}
                      disabled
                      helperText={meta.error}
                      error={Boolean(meta.error)}
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

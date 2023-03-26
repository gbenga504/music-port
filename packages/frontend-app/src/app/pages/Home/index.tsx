import React from "react";
import classNames from "classnames";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";
import type { IRenderLabel } from "../../components/Select";

import { PageLayout } from "../../components/PageLayout";
import { AppHeader } from "../../components/AppHeader";
import { Input } from "../../components/Input";
import {
  AppleMusicIcon,
  AudiomackIcon,
  BoomplayIcon,
  DeezerIcon,
  LinkIcon,
  SpotifyIcon,
  ArrowSwapIcon,
} from "../../components/icons";
import { Select, Option } from "../../components/Select";
import { Space } from "../../components/Space";
import { Button } from "../../components/Button";
import { PlaylistConvertedModal } from "../../components/PlaylistConvertedModal";

const Home: React.FC<ILoadableComponentProps> = () => {
  const renderHeadline = () => {
    return (
      <h3 className="max-w-screen-md text-left md:text-center font-bold text-2xl md:text-4xl">
        <span className="text-primary">Convert</span>
        <span>
          {" "}
          any type of Musical playlist to your preferred streaming services
          easily
        </span>
      </h3>
    );
  };

  const renderTagline = () => {
    return (
      <span className="max-w-screen-md text-left md:text-center text-base px-0 md:px-12 text-primaryGray">
        You can finally convert your musical playlist across all Musical
        streaming platforms without the hassle of doing it
      </span>
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

  const renderConverter = () => {
    return (
      <div
        className={classNames(
          "w-full mt-12 xl:mt-14 xl:p-14 xl:rounded-lg xl:bg-secondaryAlpha grid",
          "grid-rows-autoRepeat3 xl:grid-rows-1 gap-y-6 xl:gap-y-0 items-start xl:items-end",
          "grid-cols-1 xl:grid-cols-[3fr_2fr_1fr] gap-x-0 xl:gap-x-6"
        )}
      >
        <Input
          fullWidth
          textColor="white"
          size="medium"
          variant="dashed"
          prefix={<LinkIcon size={16} />}
          name="link"
        />
        <Space size="small" className="flex-col md:flex-row">
          <div className="w-full">
            <Select
              fullWidth
              size="medium"
              theme="dark"
              placeholder="select platform"
              label="Convert from"
              name="fromPlatform"
              renderLabel={renderLabel}
              value="spotify"
              disabled
            >
              {renderOptions()}
            </Select>
          </div>
          <div className="mt-4 mb-4 md:mt-8 md:mb-0">
            <ArrowSwapIcon className="rotate-90 md:rotate-0" />
          </div>
          <div className="w-full">
            <Select
              fullWidth
              size="medium"
              theme="dark"
              placeholder="select platform"
              label="Convert from"
              name="fromPlatform"
              renderLabel={renderLabel}
              value="appleMusic"
            >
              {renderOptions()}
            </Select>
          </div>
        </Space>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className="mt-4 md:mt-0"
        >
          Convert
        </Button>
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
    <PageLayout>
      <AppHeader />
      <div className="w-full grid grid-rows-autoRepeat2 justify-items-center gap-y-6 mt-12 lg:mt-24">
        {renderHeadline()}
        {renderTagline()}
      </div>
      {renderConverter()}
      {renderPlaylistConvertedModal()}
    </PageLayout>
  );
};

export default Home;

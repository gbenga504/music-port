import React, { ChangeEventHandler } from "react";
import classNames from "classnames";
import { Field, Form } from "react-final-form";
import omit from "lodash/omit";

import type { FormRenderProps } from "react-final-form";
import type { ILoadableComponentProps } from "../../../utils/routeUtils";
import type { IRenderLabel } from "../../components/Select";

import { PageLayout } from "../../components/PageLayout";
import { AppHeader } from "../../components/AppHeader";
import { Input } from "../../components/Input";
import {
  AppleMusicIcon,
  DeezerIcon,
  LinkIcon,
  SpotifyIcon,
  ArrowSwapIcon,
} from "../../components/icons";
import { Select, Option } from "../../components/Select";
import { Space } from "../../components/Space";
import { Button } from "../../components/Button";
import { PlaylistConvertedModal } from "../../components/PlaylistConvertedModal";
import { getPlatformName } from "../../../utils/url";
import { Platform, PlatformValues } from "../../../utils/platform";
import * as formValidation from "../../../utils/formValidation";

const Home: React.FC<ILoadableComponentProps> = () => {
  const handleLinkChange = (
    form: FormRenderProps<formValidation.convertPlaylistUsingLinkFormInputs>["form"]
  ) => {
    return function (evt) {
      const link = evt.target.value;
      form.change("link", link);

      const platformName = getPlatformName(link);
      form.change("fromPlatform", platformName);
    } as ChangeEventHandler<HTMLInputElement>;
  };

  const handleSubmitFormValues = (
    values: formValidation.convertPlaylistUsingLinkFormInputs
  ) => {
    console.log(values);
  };

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

  const renderHeadline = () => {
    return (
      <h3 className="font-bold text-2xl md:text-4xl">
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
      <span className="text-base px-0 md:px-12 text-primaryGray">
        You can finally convert your musical playlist across all Musical
        streaming platforms without the hassle of doing it
      </span>
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

  const renderLabel = (opts: Parameters<IRenderLabel<Platform>>[0]) => {
    return (
      <Space>
        {getPlatformIcon(opts.value)}
        <span>{opts.label}</span>
      </Space>
    );
  };

  const renderConverter = () => {
    return (
      <Form
        onSubmit={handleSubmitFormValues}
        validate={formValidation.validateConvertPlaylistUsingLinkForm}
        subscription={{ dirty: true, invalid: true, error: true }}
        render={({ handleSubmit, form }) => {
          const { invalid, dirty } = form.getState();

          return (
            <form
              className={classNames(
                "w-full mt-12 xl:mt-14 xl:p-14 xl:rounded-lg xl:bg-secondaryAlpha grid",
                "grid-rows-autoRepeat3 xl:grid-rows-1 gap-y-6 xl:gap-y-0 items-start xl:items-end",
                "grid-cols-1 xl:grid-cols-[3fr_2fr_1fr] gap-x-0 xl:gap-x-6"
              )}
              onSubmit={handleSubmit}
            >
              <Field
                name="link"
                render={({ input, meta }) => (
                  <Input
                    fullWidth
                    textColor="white"
                    size="medium"
                    placeholder="Paste playlist link"
                    variant="dashed"
                    prefix={<LinkIcon size={16} />}
                    helperText={meta.dirty && meta.error}
                    error={Boolean(meta.error && meta.dirty)}
                    onChange={handleLinkChange(form)}
                    {...omit(input, "onChange")}
                  />
                )}
              />
              <Space size="small" className="flex-col md:flex-row">
                <div className="w-full">
                  <Field
                    name="fromPlatform"
                    render={({ input, meta }) => (
                      <Select
                        fullWidth
                        size="medium"
                        theme="dark"
                        placeholder="select platform"
                        label="Convert from"
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
                <div className="mt-4 mb-4 md:mt-8 md:mb-0">
                  <ArrowSwapIcon className="rotate-90 md:rotate-0" />
                </div>
                <div className="w-full">
                  <Field
                    name="toPlatform"
                    render={({ input, meta }) => (
                      <Select
                        fullWidth
                        size="medium"
                        theme="dark"
                        placeholder="select platform"
                        label="Convert to"
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
              </Space>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className="mt-4 md:mt-0"
                htmlType="submit"
                disabled={invalid || !dirty}
              >
                Convert
              </Button>
            </form>
          );
        }}
      />
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
      <div
        className={classNames(
          "w-full md:max-w-screen-md grid grid-rows-autoRepeat2 justify-items-center gap-y-6",
          "text-left md:text-center mt-12 lg:mt-24 md:mx-auto"
        )}
      >
        {renderHeadline()}
        {renderTagline()}
      </div>
      {renderConverter()}
      {renderPlaylistConvertedModal()}
    </PageLayout>
  );
};

export default Home;

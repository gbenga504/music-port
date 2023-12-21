// @ts-nocheck

import classNames from "classnames";
import omit from "lodash/omit";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

import * as formValidation from "../../../utils/form-validation";
import { convertCamelCaseToCapitalize } from "../../../utils/formatter";
import { PlatformValues } from "../../../utils/platform";
import { constructURL, getPlatformName } from "../../../utils/url";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { Button } from "../../components/Button/Button";
import { HeadMarkup } from "../../components/HeadMarkup";
import { Input } from "../../components/Input/Input";
import { PageLayout } from "../../components/PageLayout";
import { PlatformIcon } from "../../components/PlatformIcon";
import { PlaylistConvertedModal } from "../../components/PlaylistConvertedModal";
import { Select, Option } from "../../components/Select/Select";
import { Space } from "../../components/Space";
import { useToast } from "../../components/Toast/ToastContext";
import { LinkIcon, ArrowSwapIcon } from "../../components/icons";
import { routeIds } from "../../routes";

import type { IPageQuery } from "./load-data";
import type { Platform } from "../../../utils/platform";
import type { ILoadableComponentProps } from "../../../utils/route-utils";
import type { IRenderLabel } from "../../components/Select/Select";
import type { ChangeEventHandler } from "react";
import type { FormRenderProps } from "react-final-form";

const Home: React.FC<ILoadableComponentProps<unknown, IPageQuery>> = ({
  query,
  api,
}) => {
  const [isConvertingPlaylist, setIsConvertingPlaylist] = useState(false);
  const [playlistURL, setPlaylistURL] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const requestSentToConvertPlaylist = useRef(false);

  useEffect(() => {
    (async function () {
      const { link, fromPlatform, toPlatform, isAuthTokenAvailable } = query;

      if (
        isAuthTokenAvailable === "true" &&
        !requestSentToConvertPlaylist.current &&
        toPlatform &&
        fromPlatform &&
        link
      ) {
        requestSentToConvertPlaylist.current = true;
        setIsConvertingPlaylist(true);

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

        navigate(
          constructURL({
            routeId: routeIds.home,
            query: {
              link,
              fromPlatform,
              toPlatform,
            },
          }),
          { replace: true }
        );
      }
    })();
  }, [query]);

  const handleLinkChange = (
    form: FormRenderProps<formValidation.convertPlaylistUsingLinkFormInputs>["form"]
  ) => {
    return function (evt) {
      const link = evt.target.value;
      const platformName = getPlatformName(link);

      form.batch(() => {
        form.change("link", link);
        form.change("fromPlatform", platformName ?? undefined);
      });
    } as ChangeEventHandler<HTMLInputElement>;
  };

  const handleSubmitFormValues = (
    values: formValidation.convertPlaylistUsingLinkFormInputs
  ) => {
    const redirectURI = constructURL({
      routeId: routeIds.home,
      query: {
        ...values,
        link: encodeURIComponent(values.link),
        isAuthTokenAvailable: "true",
      },
    });

    try {
      location.href = `/api/auth/${
        values.toPlatform
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

  const renderLabel = (opts: Parameters<IRenderLabel<Platform>>[0]) => {
    return (
      <Space>
        <PlatformIcon platform={opts.value} />
        <span>{opts.label}</span>
      </Space>
    );
  };

  const renderConverter = () => {
    return (
      <Form
        onSubmit={handleSubmitFormValues}
        initialValues={{
          link: query.link,
          fromPlatform: query.fromPlatform,
          toPlatform: query.toPlatform,
        }}
        validate={formValidation.validateConvertPlaylistUsingLinkForm}
        subscription={{ dirty: true, invalid: true, error: true }}
        render={({ handleSubmit, form }) => {
          const { invalid, dirtyFieldsSinceLastSubmit } = form.getState();

          const dirty = Object.values(dirtyFieldsSinceLastSubmit).reduce(
            (acc, value) => acc && value,
            true
          );

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

  const renderPlaylistConvertedModal = () => {
    return (
      <PlaylistConvertedModal
        open={Boolean(playlistURL)}
        link={playlistURL}
        fromPlatform={query.fromPlatform!}
        toPlatform={query.toPlatform!}
        onClose={() => {
          navigate(constructURL({ routeId: routeIds.home }), { replace: true });
          setPlaylistURL(null);
        }}
      />
    );
  };

  return (
    <PageLayout title="Hey">
      <HeadMarkup title="Home | Convert playlists easily" />
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

import React from "react";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

import type { ILoadableComponentProps } from "../../../../utils/routeUtils";

import { Button } from "../../../components/Button";
import { PageLayout } from "../../../components/PageLayout";
import { Select } from "../../../components/Select";
import { routeIds } from "../../../routes";
import { constructURL } from "../../../../utils/url";

const Review: React.FC<ILoadableComponentProps> = ({ pageData, params }) => {
  const navigate = useNavigate();

  const handleSubmitFormValues = ({ platform }: { platform: string }) => {
    // If the platform the user wants to export the playlist into is the same
    // as the playlist's platform, there there isn't any need to re-create the
    // playlist for this user. We just assume they can access the playlist
    // N:B ==> Maybe we need to also check the public status of the playlist before
    // attempting to do this.
    if (platform === pageData.platform) {
      return navigate(
        constructURL({
          routeId: routeIds.exportCreatePlaylist,
        }),
        {
          state: { link: pageData.importLink },
        }
      );
    }

    location.href = `/api/auth/${platform}?exportId=${params.id}&actionType=export`;
  };

  const renderForm = () => {
    return (
      <Form
        onSubmit={handleSubmitFormValues}
        subscription={{ dirty: true, invalid: true, error: true }}
        render={({ handleSubmit, form }) => {
          const { invalid, dirty } = form.getState();

          return (
            <form onSubmit={handleSubmit}>
              <Field
                name="platform"
                render={({ input, meta }) => (
                  <Select
                    size="large"
                    placeholder="Select music streaming platform"
                    error={Boolean(meta.error)}
                    helperText={meta.error}
                    fullWidth
                    {...input}
                  >
                    <option value="deezer">Deezer</option>
                    <option value="spotify">Spotify</option>
                  </Select>
                )}
              />
              <div className="flex justify-end">
                <div className="mt-6 w-full md:w-40">
                  <Button
                    variant="contained"
                    size="x-large"
                    htmlType="submit"
                    fullWidth
                    disabled={invalid || !dirty}
                  >
                    Export
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      />
    );
  };

  return (
    <PageLayout
      title="Review your playlist before exporting"
      description="Please review the information of the playlist you want to export. Thereafter, select a platform to export the playlist into."
    >
      <div>
        <div className="flex gap-x-3">
          <div className="w-24 h-24 rounded-md bg-slate-300">
            <img
              src={pageData.images[0].url}
              className="w-24 h-24 rounded-md"
            />
          </div>
          <div className="w-max">
            <h5 className="font-medium text-xl text-title">{pageData.name}</h5>
            <p className="text-sm text-title">
              <span className="font-medium">Owned by: </span>{" "}
              {pageData.owner.name}
            </p>
            <p className="text-sm">{pageData.songs.length} Songs</p>
          </div>
        </div>
        <div className="mt-5">{renderForm()}</div>
      </div>
    </PageLayout>
  );
};

export default Review;

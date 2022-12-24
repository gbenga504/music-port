import React from "react";
import { Field, Form } from "react-final-form";

import type { ILoadableComponentProps } from "../../../../utils/routeUtils";
import { Button } from "../../../components/Button";

import { PageLayout } from "../../../components/PageLayout";
import { Select } from "../../../components/Select";

const Review: React.FC<ILoadableComponentProps> = () => {
  const handleSubmitFormValues = () => {};

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
          <div className="w-24 h-24 rounded-md bg-slate-300"></div>
          <div className="w-max">
            <h5 className="font-medium text-xl text-title">
              Beautiful Melodious music
            </h5>
            <p className="text-sm text-title">
              <span className="font-medium">Owned by: </span> Anifowoshe Gbenga
            </p>
            <p className="text-sm">5 Songs</p>
          </div>
        </div>
        <div className="mt-5">{renderForm()}</div>
      </div>
    </PageLayout>
  );
};

export default Review;

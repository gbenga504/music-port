import React from "react";
import { Field, Form } from "react-final-form";

import { ILoadableComponentProps } from "../../../utils/routeUtils";
import * as formValidation from "../../../utils/formValidation";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PageLayout } from "../../components/PageLayout";

const PasteLink: React.FC<ILoadableComponentProps> = () => {
  const exportLinkSample = `${process.env.FRONTEND_BASE_URL}/export/[exportId]`;

  const handleSubmitFormValues = () => {};

  return (
    <PageLayout
      title="Paste an export link we generated"
      description={`We will use the link to export and create a playlist on your favourite music platform. Export link is of the form ${exportLinkSample}`}
    >
      <Form
        onSubmit={handleSubmitFormValues}
        validate={formValidation.validateFormInputsForPasteExportLink}
        subscription={{ dirty: true, invalid: true, error: true }}
        render={({ handleSubmit, form }) => {
          const { invalid, dirty } = form.getState();

          return (
            <form onSubmit={handleSubmit}>
              <Field
                name="link"
                render={({ input, meta }) => (
                  <Input
                    size="large"
                    fullWidth
                    placeholder={`Enter export link. E.g ${exportLinkSample}`}
                    error={Boolean(meta.error)}
                    helperText={meta.error}
                    {...input}
                  />
                )}
              />
              <div className="mt-12 w-full md:w-40">
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
            </form>
          );
        }}
      />
    </PageLayout>
  );
};

export default PasteLink;

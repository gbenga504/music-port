import React from "react";
import { Form, Field } from "react-final-form";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import * as formValidation from "../../../utils/formValidation";
import { constructURL, getPlatformName } from "../../../utils/url";
import { useToast } from "../../components/Toast/ToastContext";
import { PageLayout } from "../../components/PageLayout";
import { routeIds } from "../../routes";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";
import type { importMusicFormInputs } from "../../../utils/formValidation";

const PasteLink: React.FC<ILoadableComponentProps> = () => {
  const toast = useToast();

  const handleSubmitFormValues = (values: importMusicFormInputs) => {
    const redirectURI = constructURL({
      routeId: routeIds.importReview,
      query: {
        importLink: values.link,
      },
    });

    try {
      const platformName = getPlatformName(values.link);
      location.href = `/api/auth/${platformName}?redirect_uri=${encodeURIComponent(
        redirectURI
      )}`;
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

  return (
    <PageLayout
      title="Paste a playlist link from your streaming provider"
      description="We will use the link to generate an export link that can be shared. Only spotify and deezer playlist links are supported at the moment."
    >
      <Form
        onSubmit={handleSubmitFormValues}
        validate={formValidation.validateFormInputsForImportMusic}
        subscription={{ dirty: true, invalid: true, error: true }}
        render={({ handleSubmit, form }) => {
          const { invalid, dirty } = form.getState();

          return (
            <form onSubmit={handleSubmit}>
              <Field
                name="link"
                render={({ input, meta }) => (
                  <Input
                    placeholder="Enter your playlist link"
                    size="large"
                    fullWidth
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
                  Import
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

import React from "react";
import { Form, Field } from "react-final-form";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import * as formValidation from "../../../utils/formValidation";
import { getPlatformName } from "../../../utils/linkUtils";
import { useToast } from "../../components/Toast/ToastContext";

import type { ILoadableComponentProps } from "../../../utils/routeUtils";
import type { importMusicFormInputs } from "../../../utils/formValidation";

const PasteLink: React.FC<ILoadableComponentProps> = () => {
  const toast = useToast();

  const handleSubmitFormValues = (values: importMusicFormInputs) => {
    try {
      const platformName = getPlatformName(values.link);
      location.href = `/api/auth/${platformName}?importLink=${values.link}`;
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
    <div className="flex justify-between">
      <div className="w-2/5">
        <h4 className="font-medium text-5xl text-title">
          Paste a link from your streaming provider
        </h4>
        <p className="mt-8 block">
          We will use the link to generate an export link that can be shared.
        </p>
      </div>
      <div className="w-2/4">
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
                      placeholder="Enter a streaming link"
                      size="large"
                      fullWidth
                      error={Boolean(meta.error)}
                      helperText={meta.error}
                      {...input}
                    />
                  )}
                />
                <div className="mt-12">
                  <Button
                    variant="contained"
                    size="x-large"
                    htmlType="submit"
                    disabled={invalid || !dirty}
                  >
                    Import
                  </Button>
                </div>
              </form>
            );
          }}
        />
      </div>
    </div>
  );
};

export default PasteLink;

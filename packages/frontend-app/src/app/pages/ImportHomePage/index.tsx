import React from "react";

import { HeadMarkup } from "../../components/HeadMarkup";
import { AppHeader } from "../../components/AppHeader";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import type { ILoadableComponentProps } from "../../utils/routeUtils";

const ImportHomePage: React.FC<ILoadableComponentProps> = () => {
  return (
    <div>
      <HeadMarkup
        title="Import HomePage"
        description="Import your music from a range of music streaming platforms"
      />
      <AppHeader progressBar={{ value: 10 }} showExportButton={true} />
      <div className="w-3/4 m-auto mt-20 flex justify-between">
        <div className="w-2/5">
          <h4 className="font-medium text-5xl text-title">
            Paste a link from your streaming provider
          </h4>
          <p className="mt-8 block">
            We will use the link to generate an export link that can be shared.
          </p>
        </div>
        <div className="w-2/4">
          <form>
            <Input
              placeholder="Enter a streaming link"
              size="large"
              fullWidth
            />
            <div className="mt-12">
              <Button variant="contained" size="large" htmlType="submit">
                Import
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImportHomePage;

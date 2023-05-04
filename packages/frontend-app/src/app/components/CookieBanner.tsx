import React from "react";
import classNames from "classnames";

import { Button } from "./Button";
import useCookieConsent from "../hooks/useCookieConsent";

export const CookieBanner = () => {
  const [value, consentToCookie] = useCookieConsent();

  return !value ? (
    <div
      className={classNames(
        "bg-white p-3 flex flex-col md:flex-row justify-between items-center",
        "fixed bottom-0 left-0 w-full"
      )}
    >
      <p className="text-black w-full md:w-2/4">
        We use necessary cookies to make our site work
      </p>
      <div className="mt-3 md:mt-0">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={consentToCookie}
        >
          Ok
        </Button>
      </div>
    </div>
  ) : null;
};

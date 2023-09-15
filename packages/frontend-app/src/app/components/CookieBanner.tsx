import React from "react";
import classNames from "classnames";

import { Button } from "./Button/Button";
import useCookieConsent from "../hooks/useCookieConsent";

export const CookieBanner = () => {
  const [_, cookieStatus, consentToCookie] = useCookieConsent();

  const handleConsent = async () => {
    consentToCookie();
  };

  return cookieStatus === "user_has_not_seen_banner" ? (
    <div
      className={classNames(
        "bg-primary p-3 flex flex-col md:flex-row justify-between items-center",
        "fixed bottom-0 left-0 w-full"
      )}
    >
      <p className="text-white w-full md:w-2/4 font-light">
        We use necessary cookies to make our site work
      </p>
      <div className="mt-3 md:mt-0">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleConsent}
        >
          Ok
        </Button>
      </div>
    </div>
  ) : null;
};

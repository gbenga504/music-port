import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { useApi } from "../context/ApiContext";

type CookieValue = { necessary: boolean } | null;
type CookieConsentFn = () => Promise<void>;
type CookieStatus =
  | "cannot_be_determined"
  | "user_has_not_seen_banner"
  | "user_has_seen_banner";

// TODO: We wanna add an event listener so other parts of the code can subscribe
// to cookie change events
// cannot_be_determined: Means we cannot determine the current status of the cookie. Still need to know if user has seen banner or not
// user_has_not_seen_banner: Means the user hasn't seen the banner yet so we need to know them
// user_has_seen_banner: Means the user has seen the banner and consented
function useCookieConsent(): [CookieValue, CookieStatus, CookieConsentFn] {
  const api = useApi();

  const [cookieStatus, setCookieStatus] = useState<CookieStatus>(
    "cannot_be_determined",
  );
  const [cookieValue, setCookieValue] = useState<CookieValue>(null);

  useEffect(() => {
    const cookie = Cookies.get("cookieConsent");
    const parsedCookie: CookieValue = cookie ? JSON.parse(cookie) : null;

    setCookieStatus(
      parsedCookie ? "user_has_seen_banner" : "user_has_not_seen_banner",
    );
    setCookieValue(parsedCookie);
  }, []);

  const handleConsentToCookie = async () => {
    setCookieStatus("user_has_seen_banner");
    const value = (await api.cookieConsent.cookieConsent()) as CookieValue;

    setCookieValue(value);
  };

  return [cookieValue, cookieStatus, handleConsentToCookie];
}

export default useCookieConsent;

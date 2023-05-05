import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useApi } from "../context/ApiContext";

type CookieValue = { necessary: boolean } | null;
type CookieConsentFn = () => Promise<CookieValue>;

// TODO: We wanna add an event listener so other parts of the code can subscribe
// to cookie change events
function useCookieConsent(): [CookieValue, CookieConsentFn] {
  const api = useApi();

  const [isStatusKnown, setIsStatusKnown] = useState(false);
  const [cookieValue, setCookieValue] = useState<CookieValue>(null);

  useEffect(() => {
    const cookie = Cookies.get("cookieConsent") ?? null;

    setIsStatusKnown(true);
    setCookieValue((cookie as CookieValue) ?? null);
  }, []);

  const handleConsentToCookie = async (): Promise<CookieValue> => {
    const value = (await api.cookieConsent.cookieConsent()) as CookieValue;

    setIsStatusKnown(true);
    setCookieValue(value);
    return value;
  };

  return [
    isStatusKnown ? cookieValue : { necessary: false },
    handleConsentToCookie,
  ];
}

export default useCookieConsent;

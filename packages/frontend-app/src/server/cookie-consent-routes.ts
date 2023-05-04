import { AxiosError } from "axios";
import { Router } from "express";

const routes = Router();

routes.post("/cookie-consent", async (_req, res, _next) => {
  try {
    const cookie = { necessary: true };
    const cookieValue = JSON.stringify(cookie);

    // We want to access this in the FE via Js, hence we make sure it is not
    // httpOnly and secure
    res.cookie("cookieConsent", cookieValue);

    res.status(200).json(cookie);
  } catch (error) {
    console.error(error);
    const { response } = error as AxiosError;

    res.status(response?.status || 500).json(response?.data);
  }
});

export default routes;

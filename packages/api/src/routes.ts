import { Router } from "express";

import authRoutes from "./auth/routes";

const routes = Router();

routes.get("/debug", function (_req, res) {
  res.send("OK");
});

routes.use(authRoutes);

export default routes;

import { Express } from "express";
import Welcome from "@/routes/welcome.routes";

export const initRoutes = async (app: Express) => {
  //Testing api
  app.use("/OK", Welcome);

  app.use((req, res) => {
    const pjson = require("../../package.json");
    res.status(200).json({
      version: pjson.version,
      route: req.originalUrl,
    });
  });
};

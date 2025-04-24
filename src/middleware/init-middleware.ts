import corsMid from "cors";
import { Express } from "express";
import express from "express";
import helmet from "helmet";
import methodOverride from "method-override";

import { bodyParser, urlEncode } from "./express/body-parser";
import { contentType } from "./express/content-type";
import { cookieParser } from "./express/cookie-parser";
import { cors } from "./express/cors";
import { noCache } from "./express/no-cache";

export const initMiddlewares = (app: Express): void => {
  app.use(urlEncode);
  app.use(bodyParser);
  app.use(methodOverride());
  app.use(methodOverride("X-HTTP-Method")); //          Microsoft
  app.use(methodOverride("X-HTTP-Method-Override")); // Google/GData
  app.use(methodOverride("X-Method-Override")); //      IBM
  app.use(cors);
  app.use(helmet());

  const corsConfig = {
    origin: true,
    credentials: true,
  };
  app.use(corsMid(corsConfig));

  app.use(cookieParser);
  app.use(contentType);
  app.use(noCache);

  // Middlewares adicionais
  app.use(express.json()); // Suporte para JSON
  app.use(express.urlencoded({ extended: true }));
};

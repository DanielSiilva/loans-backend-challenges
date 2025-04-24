import "./bootstrap";
import express from "express";

import { MongoConnection } from "@/infra/mongo";
import { Logger } from "@/helpers/logger";
import { initRoutes } from "@/routes/init-routes";
import { initMiddlewares } from "@/middleware/init-middleware";

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err}`);
});

process.on("unhandledRejection", (reason: any, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
  if (reason instanceof Error) console.error("Stack Trace:", reason.stack);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing the application");
  process.exit(0);
});

process.on("exit", (code) => {
  console.error(`Process exiting with code: ${code}`);
});

const app = express();

(async () => {
  try {
    //Connect Db
    await MongoConnection.getInstance().connect();

    // // Inicialização dos middlewares
    initMiddlewares(app);

    // Inicialização das rotas
    await initRoutes(app);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      Logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    Logger.error(`Failed to start the server: ${error}`);
    process.exit(1);
  }
})();

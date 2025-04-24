import pino from "pino";

export const Logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "HH:MM:ss dd-mm-yyyy",
      ignore: "pid,hostname",
    },
  },
});

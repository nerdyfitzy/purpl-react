import winston from "winston";
import { v4 } from "uuid";
import path from "path";
require("dotenv").config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: path.join(
        process.env.APPDATA,
        "purpl",
        "local-data",
        "logs",
        v4()
      ),
      level: "silly",
    }),
  ],
});

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const log = (message, level = "info") => {
  logger.log({
    level,
    message,
  });
};

export { log };

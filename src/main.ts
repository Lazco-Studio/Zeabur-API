import Fastify from "fastify";
import fastifyEnv from "@fastify/env";

import { envOptions } from "../modules/fastify/envOptions";
import { appRouter } from "./app/router";
import {
  fallbackErrorHandler,
  notFoundHandler,
} from "../modules/fastify/plugins/errorHandlers";

export const fastifyApp = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
});

fastifyApp.register(fastifyEnv, envOptions).ready((_error) => {
  fastifyApp.log.info(
    `Loaded envs: ${Object.keys(fastifyApp.getEnvs()).join(", ")}`,
  );
});

fastifyApp.setNotFoundHandler(notFoundHandler);

fastifyApp.setErrorHandler(fallbackErrorHandler);

appRouter(fastifyApp);

fastifyApp.listen({ port: 3000 }, (error, _address) => {
  if (error) {
    fastifyApp.log.error(error);
    process.exit(1);
  }
});

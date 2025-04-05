import Fastify from "fastify";
import fastifyEnv from "@fastify/env";

import { envOptions } from "../modules/fastify/envOptions";
import { appRouter } from "./app/router";
import {
  fallbackErrorHandler,
  notFoundHandler,
} from "../modules/fastify/plugins/errorHandlers";
import { proxmoxAPI } from "../modules/proxmoxApi";

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

  proxmoxAPI.init({
    host: process.env.LAZCO_PVE_CLUSTER_HOST as string,
    tokenId: process.env.LAZCO_PVE_CLUSTER_API_TOKEN_ID as string,
    tokenSecret: process.env.LAZCO_PVE_CLUSTER_API_TOKEN_SECRET as string,
    logger: fastifyApp.log,
  });
  fastifyApp.log.info("ProxmoxAPI is initialized");
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

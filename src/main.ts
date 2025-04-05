import Fastify from "fastify";
import fastifyEnv from "@fastify/env";

import { envOptions } from "../modules/fastify/envOptions";
import { appRouter } from "./app/router";
import { ClientError } from "../modules/clientError";
import { HttpStatus } from "../modules/http/statusCodes";

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

fastifyApp.setNotFoundHandler((_request, reply) => {
  reply.status(HttpStatus.NOT_FOUND).send({
    errorMessage: "Invalid request path or method.",
  });
});

fastifyApp.setErrorHandler((error, _request, reply) => {
  switch (true) {
    case error.code === "FST_ERR_VALIDATION": {
      return reply.status(HttpStatus.BAD_REQUEST).send({
        errorMessage: error.message,
        errorObject: {
          validationErrors: error.validation,
        },
      });
    }

    case "__type__" in error && error.__type__ === "CLIENT_ERROR": {
      const clientError = error as unknown as ClientError;
      return reply.status(clientError.code).send({
        errorMessage: clientError.payload?.errorMessage,
        errorObject: clientError.payload?.errorObject,
      });
    }

    default: {
      return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errorMessage: "Unexpected error occurred. Please try again.",
      });
    }
  }
});

appRouter(fastifyApp);

fastifyApp.listen({ port: 3000 }, (error, _address) => {
  if (error) {
    fastifyApp.log.error(error);
    process.exit(1);
  }
});

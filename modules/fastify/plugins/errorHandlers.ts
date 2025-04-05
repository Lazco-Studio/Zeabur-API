import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "../../http/statusCodes";
import { ClientError } from "../../clientError";

export function notFoundHandler(
  _request: FastifyRequest,
  response: FastifyReply,
) {
  return response.status(HttpStatus.NOT_FOUND).send({
    errorMessage: "Invalid request path or method.",
  });
}

export function fallbackErrorHandler(
  error: FastifyError,
  request: FastifyRequest,
  response: FastifyReply,
) {
  if (process.env.APP_ENVIRONMENT !== "production") {
    request.log.error(error.message);
  }

  switch (true) {
    case error.code === "FST_ERR_VALIDATION": {
      return response.status(HttpStatus.BAD_REQUEST).send({
        errorMessage: error.message,
        errorObject: {
          validationErrors: error.validation,
        },
      });
    }

    case "__type__" in error && error.__type__ === "CLIENT_ERROR": {
      const clientError = error as unknown as ClientError;
      return response.status(clientError.code).send({
        errorMessage: clientError.payload?.errorMessage,
        errorObject: clientError.payload?.errorObject,
      });
    }

    default: {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errorMessage: "Unexpected error occurred. Please try again.",
      });
    }
  }
}

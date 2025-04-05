import { FastifyInstance } from "fastify";

import { v1Router } from "./v1/router";
import { appController } from "./controller";

export function appRouter(app: FastifyInstance) {
  app.register(v1Router, { prefix: "/v1" });

  app.register(appController);
}

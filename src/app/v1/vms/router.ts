import { FastifyInstance } from "fastify";

import { vmsController } from "./controller";

export function vmsRouter(app: FastifyInstance) {
  app.register(vmsController);
}

import { FastifyInstance } from "fastify";

import { vmsRouter } from "./vms/router";

export function v1Router(app: FastifyInstance) {
  app.register(vmsRouter, { prefix: "/vms" });
}

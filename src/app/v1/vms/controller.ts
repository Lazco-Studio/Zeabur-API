import { FastifyInstance, FastifyRequest } from "fastify";

import { createVmService } from "./services";
import {
  CreateVmRequest,
  createVmRequestSchema,
  createVmResponseSchema,
} from "./schemas";

export function vmsController(app: FastifyInstance) {
  app.addSchema(createVmRequestSchema);
  app.addSchema(createVmResponseSchema);

  app.post("/", {
    schema: {
      body: { $ref: "createVmServiceRequest#" },
      response: {
        201: {
          $ref: "createVmServiceResponse#",
        },
      },
    },
    handler: async (
      request: FastifyRequest<{ Body: CreateVmRequest }>,
      response,
    ) => {
      const { name, region, plan, password, labels } = request.body;

      const vmData = await createVmService({
        name,
        region,
        plan,
        password,
        labels,
      });

      return response.code(201).send(vmData);
    },
  });
  // app.get(
  //   "/:vmId",
  //   async (
  //     request: FastifyRequest<{
  //       Params: {
  //         vmId: string;
  //       };
  //     }>,
  //     response,
  //   ) => {
  //     const { vmId } = request.params;

  //     response.send({
  //       vmId,
  //     });
  //   },
  // );
}

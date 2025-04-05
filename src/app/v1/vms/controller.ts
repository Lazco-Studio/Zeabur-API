import { FastifyInstance, FastifyRequest } from "fastify";

import { createVmsService } from "./services";
import {
  CreateVmsServiceRequest,
  CreateVmsServiceRequestSchema,
  CreateVmsServiceResponseSchema,
} from "./schemas";

export function vmsController(app: FastifyInstance) {
  app.addSchema(CreateVmsServiceRequestSchema);
  app.addSchema(CreateVmsServiceResponseSchema);

  app.post("/", {
    schema: {
      body: { $ref: "createVmsServiceRequest#" },
      response: {
        201: {
          $ref: "createVmsServiceResponse#",
        },
      },
    },
    handler: async (
      request: FastifyRequest<{ Body: CreateVmsServiceRequest }>,
      response,
    ) => {
      const { name, region, plan, password, labels } = request.body;

      const vmData = await createVmsService({
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

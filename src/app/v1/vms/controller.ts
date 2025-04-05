import { FastifyInstance, FastifyRequest } from "fastify";

import {
  createVmService,
  deleteVmService,
  operateVmPowerService,
} from "./services";
import {
  CreateVmRequest,
  createVmRequestSchema,
  createVmResponseSchema,
  DeleteVmRequestParams,
  deleteVmRequestParamsSchema,
  OperateVmPowerRequest,
  OperateVmPowerRequestParams,
  operateVmPowerRequestParamsSchema,
  operateVmPowerRequestSchema,
} from "./schemas";

export function vmsController(app: FastifyInstance) {
  app.addSchema(createVmRequestSchema);
  app.addSchema(createVmResponseSchema);
  app.addSchema(deleteVmRequestParamsSchema);
  app.addSchema(operateVmPowerRequestSchema);
  app.addSchema(operateVmPowerRequestParamsSchema);

  app.post("/", {
    schema: {
      body: { $ref: "createVmRequest#" },
      response: {
        201: {
          $ref: "createVmResponse#",
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

  app.delete("/:managedId", {
    schema: {
      params: { $ref: "deleteVmRequestParams#" },
    },
    handler: async (
      request: FastifyRequest<{ Params: DeleteVmRequestParams }>,
      response,
    ) => {
      const { managedId } = request.params;

      await deleteVmService({ managedId });

      return response.code(204).send();
    },
  });

  app.post("/:managedId/power", {
    schema: {
      params: { $ref: "operateVmPowerRequestParams#" },
      body: { $ref: "operateVmPowerRequest#" },
    },
    handler: async (
      request: FastifyRequest<{
        Params: OperateVmPowerRequestParams;
        Body: OperateVmPowerRequest;
      }>,
      response,
    ) => {
      const { managedId } = request.params;
      const { action } = request.body;

      await operateVmPowerService({
        managedId,
        action,
      });

      return response.code(204).send();
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

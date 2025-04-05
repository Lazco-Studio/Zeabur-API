import { FastifyInstance, FastifyRequest } from "fastify";

import {
  createVmService,
  deleteVmService,
  getVmStatusService,
  operateVmPowerService,
} from "./services";
import {
  CreateVmRequest,
  createVmRequestSchema,
  createVmResponseSchema,
  getVmStatusResponseSchema,
  ManagedIdRequestParams,
  managedIdRequestParamsSchema,
  OperateVmPowerRequest,
  operateVmPowerRequestSchema,
} from "./schemas";
import { proxmoxAPI } from "../../../../modules/proxmoxApi";
import { nodes } from "../../../../modules/proxmoxApi/nodes";

export function vmsController(app: FastifyInstance) {
  app.addSchema(managedIdRequestParamsSchema);
  app.addSchema(createVmRequestSchema);
  app.addSchema(createVmResponseSchema);
  app.addSchema(operateVmPowerRequestSchema);
  app.addSchema(getVmStatusResponseSchema);

  app.get("/", async (_request, response) => {
    const status = await proxmoxAPI
      .instance()
      .nodes.$(nodes.tpe1)
      .status.$get();
    return response.code(200).send(status);
  });

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
      params: { $ref: "managedIdRequestParams#" },
    },
    handler: async (
      request: FastifyRequest<{ Params: ManagedIdRequestParams }>,
      response,
    ) => {
      const { managedId } = request.params;

      await deleteVmService({ managedId });

      return response.code(204).send();
    },
  });

  app.post("/:managedId/power", {
    schema: {
      params: { $ref: "managedIdRequestParams#" },
      body: { $ref: "operateVmPowerRequest#" },
    },
    handler: async (
      request: FastifyRequest<{
        Params: ManagedIdRequestParams;
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

  app.get("/:managedId/status", {
    schema: {
      params: { $ref: "managedIdRequestParams#" },
      response: {
        200: { $ref: "getVmStatusResponse#" },
      },
    },
    handler: async (
      request: FastifyRequest<{ Params: ManagedIdRequestParams }>,
      response,
    ) => {
      const { managedId } = request.params;

      const vmStatus = await getVmStatusService({ managedId });

      return response.code(200).send(vmStatus);
    },
  });
}

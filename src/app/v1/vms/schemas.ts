import { VmPlans, VmPowerActions, VmRegions } from "../../../../types/vm";

export const managedIdRequestParamsSchema = {
  $id: "managedIdRequestParams",
  type: "object",
  required: ["managedId"],
  properties: {
    managedId: {
      type: "string",
      description: "The managed ID of the VM",
    },
  },
  additionalProperties: false,
};
export type ManagedIdRequestParams = {
  managedId: string;
};

export const createVmRequestSchema = {
  $id: "createVmRequest",
  type: "object",
  required: ["name", "region", "plan", "password"],
  properties: {
    name: {
      type: "string",
      description: "The name of the VM",
    },
    region: {
      type: "string",
      enum: Object.values(VmRegions),
      description: "The region where the VM will be deployed",
    },
    plan: {
      type: "string",
      enum: Object.values(VmPlans),
      description: "The plan of the VM",
    },
    password: {
      type: "string",
      description: "Password for the VM",
    },
    labels: {
      type: "object",
      additionalProperties: {
        type: "string",
      },
      description: "Key-value pairs for labeling the VM",
    },
  },
  additionalProperties: false,
};
export type CreateVmRequest = {
  name: string;
  region: VmRegions;
  plan: VmPlans;
  password: string;
  labels: Record<string, string>;
};

export const createVmResponseSchema = {
  $id: "createVmResponse",
  type: "object",
  required: ["ip", "managedId"],
  properties: {
    ip: {
      type: "string",
      description: "The IP address of the VM",
    },
    managedId: {
      type: "string",
      description: "The managed ID of the VM",
    },
  },
  additionalProperties: false,
};
export type CreateVmServiceResponse = {
  ip: string;
  managedId: string;
};

export const operateVmPowerRequestSchema = {
  $id: "operateVmPowerRequest",
  type: "object",
  required: ["action"],
  properties: {
    action: {
      type: "string",
      enum: Object.values(VmPowerActions),
      description: "The action to perform on the VM",
    },
  },
  additionalProperties: false,
};
export type OperateVmPowerRequest = {
  action: VmPowerActions;
};

export const getVmStatusResponseSchema = {
  $id: "getVmStatusResponse",
  type: "object",
  required: ["status"],
  properties: {
    status: {
      type: "string",
      description: "The status of the VM",
    },
  },
  additionalProperties: false,
};
export type GetVmStatusServiceResponse = {
  status: string;
};

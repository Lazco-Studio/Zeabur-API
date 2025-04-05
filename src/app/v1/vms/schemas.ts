import { VmsPlan, VmsRegion } from "./services";

export const CreateVmsServiceRequestSchema = {
  $id: "createVmsServiceRequest",
  type: "object",
  required: ["name", "region", "plan", "password"],
  properties: {
    name: {
      type: "string",
      description: "The name of the VM",
    },
    region: {
      type: "string",
      enum: Object.values(VmsRegion),
      description: "The region where the VM will be deployed",
    },
    plan: {
      type: "string",
      enum: Object.values(VmsPlan),
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
export type CreateVmsServiceRequest = {
  name: "string";
  region: VmsRegion;
  plan: VmsPlan;
  password: "string";
  labels: Record<string, string>;
};

export const CreateVmsServiceResponseSchema = {
  $id: "createVmsServiceResponse",
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
export type CreateVmsServiceResponse = {
  ip: "string";
  managedId: "string";
};

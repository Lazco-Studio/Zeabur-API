import { FastifyEnvOptions } from "@fastify/env";

const schema: FastifyEnvOptions["schema"] = {
  type: "object",
  required: [
    "PORT",
    "LAZCO_PVE_CLUSTER_HOST",
    "LAZCO_PVE_CLUSTER_API_TOKEN_ID",
    "LAZCO_PVE_CLUSTER_API_TOKEN_SECRET",
  ],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    LAZCO_PVE_CLUSTER_HOST: {
      type: "string",
    },
    LAZCO_PVE_CLUSTER_API_TOKEN_ID: {
      type: "string",
    },
    LAZCO_PVE_CLUSTER_API_TOKEN_SECRET: {
      type: "string",
    },
  },
};

export const envOptions: FastifyEnvOptions = {
  confKey: "config",
  schema: schema,
};

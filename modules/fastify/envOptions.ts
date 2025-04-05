import { FastifyEnvOptions } from "@fastify/env";

const schema: FastifyEnvOptions["schema"] = {
  type: "object",
  required: ["PORT", "LAZCO_PVE_CLUSTER_API_KEY"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    LAZCO_PVE_CLUSTER_API_KEY: {
      type: "string",
    },
  },
};

export const envOptions: FastifyEnvOptions = {
  confKey: "config",
  schema: schema,
};

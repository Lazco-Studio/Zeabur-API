import { FastifyEnvOptions } from "@fastify/env";

const schema: FastifyEnvOptions["schema"] = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

export const envOptions: FastifyEnvOptions = {
  confKey: "config",
  schema: schema,
};

import { FastifyInstance } from "fastify";

export function appController(app: FastifyInstance) {
  app.get("/", async (_request, response) => {
    response.send({
      message: "Welcome to Lazco Studio API!",
    });
  });
}

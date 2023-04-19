import cors from "@fastify/cors";
import AltairFastify from "altair-fastify-plugin";
import Fastify from "fastify";
import mercurius from "mercurius";
import connect from "./db";
import graphqlSchema from "./gql";

const app = Fastify({
  logger: true,
});

const init = async () => {
  await connect();
  app.register(cors, {});
  app.register(mercurius, {
    schema: graphqlSchema,
    path: "/gql",
  });

  app.register(AltairFastify, {
    path: "/playground",
    baseURL: "/playground/",
    endpointURL: "/gql",
  });
};

(async () => {
  try {
    await init();
    await app.listen({ port: 3000 });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();

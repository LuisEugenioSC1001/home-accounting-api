"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const altair_fastify_plugin_1 = __importDefault(require("altair-fastify-plugin"));
const fastify_1 = __importDefault(require("fastify"));
const mercurius_1 = __importDefault(require("mercurius"));
const db_1 = __importDefault(require("./db"));
const gql_1 = __importDefault(require("./gql"));
const app = (0, fastify_1.default)({
    logger: true,
});
const init = async () => {
    await (0, db_1.default)();
    app.register(cors_1.default, {});
    app.register(mercurius_1.default, {
        schema: gql_1.default,
        path: "/gql",
    });
    app.register(altair_fastify_plugin_1.default, {
        path: "/playground",
        baseURL: "/playground/",
        endpointURL: "/gql",
    });
};
(async () => {
    try {
        await init();
        await app.listen({ port: 3000 });
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
})();

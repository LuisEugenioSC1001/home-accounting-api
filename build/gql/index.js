"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const mongoose_1 = __importDefault(require("mongoose"));
const MovementSchema = new mongoose_1.default.Schema({
    name: { type: String, index: true },
    value: { type: Number, index: true },
    date: { type: Date, index: true },
    createdBy: { type: String, index: true },
}, { versionKey: false });
const Movement = mongoose_1.default.model("Movement", MovementSchema);
const MovementTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(Movement, {});
graphql_compose_1.schemaComposer.Query.addFields({
    movement: MovementTC.getResolver("findById"),
    movements: MovementTC.getResolver("findMany"),
});
graphql_compose_1.schemaComposer.Mutation.addFields({
    createMovement: MovementTC.getResolver("createOne"),
    updateMovement: MovementTC.getResolver("updateById"),
    deleteMovement: MovementTC.getResolver("removeById"),
});
const graphqlSchema = graphql_compose_1.schemaComposer.buildSchema();
exports.default = graphqlSchema;

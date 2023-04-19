import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import mongoose from "mongoose";
const MovementSchema = new mongoose.Schema(
  {
    name: { type: String, index: true },
    value: { type: Number, index: true },
    date: { type: Date, index: true },
    createdBy: { type: String, index: true },
  },
  { versionKey: false }
);

const Movement = mongoose.model("Movement", MovementSchema);
const MovementTC = composeWithMongoose(Movement, {});

schemaComposer.Query.addFields({
  movement: MovementTC.getResolver("findById"),
  movements: MovementTC.getResolver("findMany"),
});
schemaComposer.Mutation.addFields({
  createMovement: MovementTC.getResolver("createOne"),
  updateMovement: MovementTC.getResolver("updateById"),
  deleteMovement: MovementTC.getResolver("removeById"),
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;

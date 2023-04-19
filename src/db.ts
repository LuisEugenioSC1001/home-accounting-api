import mongoose from "mongoose";
import config from "./config";

const connect = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(config?.MONGODB_URI);
    console.log("Connected");
  } catch (error: any) {
    console.log("Connection failure " + error?.message);
  }
};

export default connect;

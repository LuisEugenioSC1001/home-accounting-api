"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const connect = async () => {
    mongoose_1.default.set("strictQuery", false);
    try {
        await mongoose_1.default.connect(config_1.default?.MONGODB_URI);
        console.log("Connected");
    }
    catch (error) {
        console.log("Connection failure " + error?.message);
    }
};
exports.default = connect;

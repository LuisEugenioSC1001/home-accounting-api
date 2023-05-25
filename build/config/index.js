"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    MONGODB_URI: process.env.MONGODB_URI || "",
    PORT: process.env.PORT,
};

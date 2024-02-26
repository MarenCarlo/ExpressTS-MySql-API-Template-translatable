"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const parseBoolean = (value) => (value === null || value === void 0 ? void 0 : value.toLowerCase()) === 'true';
const server_state = parseBoolean(process.env.SV_STATE);
exports.default = {
    database: {
        host: process.env.DB_HOST || "127.0.0.1",
        database: server_state === true ? process.env.DB_DATABASE_PRO : process.env.DB_DATABASE_DEV,
        port: Number(process.env.DB_PORT) || 3006,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        timezone: server_state === true ? process.env.DB_TIMEZONE_PRO : process.env.DB_TIMEZONE_DEV || "UTC+0"
    }
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const db = new sequelize_typescript_1.Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    models: [path_1.default.join(__dirname, '..', 'models', '*.{js,ts}')],
});
db.sync();
exports.default = db;
//# sourceMappingURL=database.js.map
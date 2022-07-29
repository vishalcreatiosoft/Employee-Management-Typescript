"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dev_logger_1 = __importDefault(require("./dev-logger"));
const prod_logger_1 = __importDefault(require("./prod-logger"));
let logger;
if (process.env.NODE_ENV === 'development') {
    logger = (0, dev_logger_1.default)();
}
else {
    logger = (0, prod_logger_1.default)();
}
exports.default = logger;

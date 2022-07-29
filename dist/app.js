"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const route_1 = __importDefault(require("./routes/route"));
const adminService_1 = __importDefault(require("./services/adminService"));
const mongodbConnection_1 = __importDefault(require("./utils/mongodbConnection"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const port = 3000;
const app = (0, express_1.default)();
mongodbConnection_1.default.init();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
adminService_1.default.config(app);
app.use('/', route_1.default);
http_1.default.createServer(app).listen(port, () => {
    console.log(`server started on port ${port}`);
    (0, swagger_1.default)(app, port);
});

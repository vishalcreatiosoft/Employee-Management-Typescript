"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    cookie: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false }
});
exports.default = (0, mongoose_1.model)('Session', sessionSchema, 'sessionDb');

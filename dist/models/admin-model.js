"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    role: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    mobile: {
        type: Number,
        trim: true,
        unique: true
    },
    encryptedPassword: {
        type: String,
        trim: true,
    }
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('AdminRegistration', adminSchema, 'adminDb');

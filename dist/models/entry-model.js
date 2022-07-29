"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EntrySchema = new mongoose_1.Schema({
    employeeId: {
        type: String
    },
    name: {
        type: String
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});
exports.default = (0, mongoose_1.model)('EntryTime', EntrySchema, 'attendanceReport');

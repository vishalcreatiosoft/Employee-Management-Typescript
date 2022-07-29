"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const allocateProjectSchema = new mongoose_1.Schema({
    employeeId: {
        type: String,
    },
    name: {
        type: String
    },
    project: {
        type: String
    },
    role: {
        type: String
    },
    projectManager: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false }
});
exports.default = (0, mongoose_1.model)('EmployeeProject', allocateProjectSchema, 'projectsDb');

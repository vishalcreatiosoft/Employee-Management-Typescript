"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmployeeSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        trim: true,
        unique: true
    },
    designation: {
        type: String,
        trim: true,
    },
    salary: {
        type: Number,
        trim: true
    }
});
exports.default = (0, mongoose_1.model)('Registration', EmployeeSchema);

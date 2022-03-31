"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_emp_model_1 = __importDefault(require("../models/register-emp-model"));
const mongoose_1 = __importDefault(require("mongoose"));
class RegisterEmployee {
    //function to register new employee
    registerEmp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const register = new register_emp_model_1.default(req.body);
                const data = yield register.save();
                if (data) {
                    res.status(201).send('employee registered successfully');
                }
                if (!data) {
                    res.status(403).send('employee data not found');
                }
            }
            catch (error) {
                res.status(500).send('employee registration failed');
            }
        });
    }
    // function to get all employee data
    getEmp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            try {
                const data = yield register_emp_model_1.default.find(query);
                if (data) {
                    res.status(201).send({ success: true, result: data });
                }
                if (!data) {
                    res.status(403).send('Employee data not found');
                }
            }
            catch (error) {
                res.status(500).send('Unable to find employee data');
            }
        });
    }
    // function to get particular employee data
    getEmpployeeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield register_emp_model_1.default.findById(id);
                if (data) {
                    res.status(201).send({ success: true, result: data });
                }
                if (!data) {
                    res.status(403).send('Employee data not found');
                }
            }
            catch (error) {
                res.status(500).send('Unable to find employee data');
            }
        });
    }
    //function to update the employee data
    editEmp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {};
                const { id } = req.params;
                query._id = new mongoose_1.default.Types.ObjectId(id);
                const { firstname, lastname, email, mobile, designation } = req.body;
                const updateKeys = {
                    firstname,
                    lastname,
                    email,
                    mobile,
                    designation
                };
                const data = yield register_emp_model_1.default.updateOne(query, updateKeys);
                if (data) {
                    res.status(201).send('employee updated successfully');
                }
                if (!data) {
                    res.status(403).send('employee data not found ');
                }
            }
            catch (error) {
                res.status(500).send('employee update failed');
            }
        });
    }
}
const registerEmployee = new RegisterEmployee();
exports.default = registerEmployee;

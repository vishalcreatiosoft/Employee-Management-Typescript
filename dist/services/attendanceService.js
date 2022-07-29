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
const entry_model_1 = __importDefault(require("../models/entry-model"));
const register_emp_model_1 = __importDefault(require("../models/register-emp-model"));
class ManageAttendance {
    checkEmployeeExists(id) {
        return new Promise((resolve, reject) => {
            register_emp_model_1.default.findById(id)
                .then((response) => {
                resolve({ success: true, result: response });
            })
                .catch(error => {
                reject({ success: false, result: 'No Employee found with this id' });
            });
        });
    }
    makeAttendance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const checkEmployee = yield this.checkEmployeeExists(id);
            if (checkEmployee.success) {
                const entryData = {
                    employeeId: `${checkEmployee.result.employeeId}`,
                    name: `${checkEmployee.result.firstname} ${checkEmployee.result.lastname}`
                };
                const entryDetail = new entry_model_1.default(entryData);
                yield entryDetail.save()
                    .then(() => {
                    res.status(201).send({ success: true, result: 'Attendance Marked' });
                })
                    .catch((error) => {
                    res.status(403).send({ success: false, result: `Error occurred ${error}` });
                });
            }
            else {
                res.status(401).send({ success: false, result: 'Unauthorized Employee' });
            }
        });
    }
    getAttendanceReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeId = req.body.employeeId;
            const query = {};
            query.employeeId = employeeId;
            yield entry_model_1.default.find(query)
                .then((response) => {
                res.status(201).send({ success: true, result: response });
            })
                .catch(() => {
                res.status(401).send({ success: true, result: 'No Records found' });
            });
        });
    }
}
const manageAttendance = new ManageAttendance();
exports.default = manageAttendance;

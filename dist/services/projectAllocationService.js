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
const allocate_project_model_1 = __importDefault(require("../models/allocate-project-model"));
const register_emp_model_1 = __importDefault(require("../models/register-emp-model"));
class Project {
    checkEmployeeExist(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            query.employeeId = employeeId;
            const getEmployee = yield register_emp_model_1.default.find(query);
            if (getEmployee.length === 0) {
                return { success: false, result: `No Employee found with Id ${employeeId}` };
            }
            if (getEmployee.length !== 0) {
                return { success: true, result: getEmployee };
            }
        });
    }
    allocateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { employeeId } = req.body;
            const checkEmployee = yield this.checkEmployeeExist(employeeId);
            if (!checkEmployee.success) {
                res.send(checkEmployee.result);
            }
            if (checkEmployee.success) {
                const { project, role, projectManager } = req.body;
                let query = {};
                query = {
                    employeeId,
                    name: `${checkEmployee.result[0].firstname} ${checkEmployee.result[0].lastname}`,
                    project,
                    role,
                    projectManager
                };
                const employeeProject = new allocate_project_model_1.default(query);
                yield employeeProject.save()
                    .then((response) => {
                    res.status(201).send({ success: true, result: response });
                })
                    .catch(() => {
                    res.status(401).send({ success: true, result: 'Unable to allocate project' });
                });
            }
        });
    }
    getEmployeeProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { employeeId } = req.body;
            const checkEmployee = yield this.checkEmployeeExist(employeeId);
            if (!checkEmployee.success) {
                res.send(checkEmployee.result);
            }
            if (checkEmployee.success) {
                const query = {};
                query.employeeId = employeeId;
                yield allocate_project_model_1.default.find(query)
                    .then((response) => {
                    res.status(201).send({ success: true, result: response });
                })
                    .catch((error) => {
                    res.status(401).send({ success: false, result: error });
                });
            }
        });
    }
    getlistProjectEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { project } = req.body;
            const projectList = [];
            yield allocate_project_model_1.default.find({})
                .then((allProjects) => {
                for (let requiredProject of allProjects) {
                    if (requiredProject.project == project) {
                        projectList.push(requiredProject);
                    }
                }
                res.send({ success: true, result: projectList });
            })
                .catch(() => {
                res.send({ success: false, result: 'This Project is not found' });
            });
        });
    }
}
const project = new Project();
exports.default = project;

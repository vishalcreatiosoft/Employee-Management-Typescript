"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registrationService_1 = __importDefault(require("../services/registrationService"));
const attendanceService_1 = __importDefault(require("../services/attendanceService"));
const projectAllocationService_1 = __importDefault(require("../services/projectAllocationService"));
const adminService_1 = __importDefault(require("../services/adminService"));
const index_1 = __importDefault(require("../logger/index"));
const router = (0, express_1.Router)();
//Register admin
/**
 * @openapi
 *
 * '/register-admin':
 *  post:
 *     summary: "is used for admin registration"
 *     tags:
 *     - Registration
 *     description: Register a admin user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                $ref: '#components/schemas/registerAdmin'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *
 */
router.post('/register-admin', (req, res) => {
    index_1.default.info('This is register admin info', { meta: 1 });
    index_1.default.warn('This is register admin warn');
    index_1.default.error(new Error('This is register admin error'));
    adminService_1.default.registerAdmin(req, res);
});
// admin login 
/**
 * @openapi
 *
 * '/login':
 *  post:
 *     summary: "is used for admin login"
 *     tags:
 *     - Login
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginAdmin'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *               schema:
 *                  $ref: '#/components/schemas/loginResponse'
 *       400:
 *         description: Bad Request
 *
 */
router.post('/login', (req, res) => {
    adminService_1.default.loginAdmin(req, res);
});
//Register new employee
router.post('/register-employee', (req, res) => {
    registrationService_1.default.registerEmp(req, res);
});
//update existing employee
router.put('/update-employee/:id', (req, res) => {
    registrationService_1.default.editEmp(req, res);
});
//list employee data
router.get('/get-employee', (req, res) => {
    registrationService_1.default.getEmp(req, res);
});
//list individual employee data
router.get('/getEmployeeById/:id', (req, res) => {
    registrationService_1.default.getEmpployeeById(req, res);
});
//delete individual employee data
router.delete('/deleteEmployee/:id', (req, res) => {
    registrationService_1.default.deleteEmployee(req, res);
});
//store entry time to make attendance of employee
router.post('/makeAttendance/:id', (req, res) => {
    attendanceService_1.default.makeAttendance(req, res);
});
//get specific employee attendance history
router.get('/getEmployeeAttendanceReport', (req, res) => {
    attendanceService_1.default.getAttendanceReport(req, res);
});
//Allocated projects to employees
router.post('/allocateProject', (req, res) => {
    projectAllocationService_1.default.allocateProject(req, res);
});
// find which project is allocated to specific employee
router.get('/getEmployeeProject', (req, res) => {
    projectAllocationService_1.default.getEmployeeProject(req, res);
});
// list of employee on a project
router.get('/listProjectEmployee', (req, res) => {
    projectAllocationService_1.default.getlistProjectEmployee(req, res);
});
//logout admin
router.post('/logout', (req, res) => {
    adminService_1.default.logout(req, res);
});
exports.default = router;

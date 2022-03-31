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
const express_1 = require("express");
const registration_1 = __importDefault(require("../services/registration"));
const router = (0, express_1.Router)();
//testing route
router.get('/', (req, res) => {
    res.send('Landing page from router');
});
//Register new employee
router.post('/register-employee', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    registration_1.default.registerEmp(req, res);
}));
//update existing employee
router.put('/update-employee/:id', (req, res) => {
    registration_1.default.editEmp(req, res);
});
router.get('/get-employee', (req, res) => {
    registration_1.default.getEmp(req, res);
});
router.get('/getEmployeeById/:id', (req, res) => {
    registration_1.default.getEmpployeeById(req, res);
});
exports.default = router;

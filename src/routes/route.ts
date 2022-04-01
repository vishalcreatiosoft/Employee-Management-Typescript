import { Router } from "express";
import registerEmployee from "../services/registrationService";
import manageAttendance from "../services/attendanceService";
import manageProject from "../services/projectAllocationService";
import adminService from "../services/adminService";

const router = Router();

//Register admin
router.post('/register-admin',(req, res)=>{
    adminService.registerAdmin(req, res);
})

// admin login 
router.post('/login',(req, res)=>{
    adminService.loginAdmin(req, res);
})

//Register new employee
router.post('/register-employee', (req, res)=>{
    registerEmployee.registerEmp(req, res);
});

//update existing employee
router.put('/update-employee/:id',(req, res)=>{
    registerEmployee.editEmp(req, res);
});

//list employee data
router.get('/get-employee',(req, res)=>{
    registerEmployee.getEmp(req, res);
});

//list individual employee data
router.get('/getEmployeeById/:id',(req, res)=>{
    registerEmployee.getEmpployeeById(req, res);
});

//delete individual employee data
router.delete('/deleteEmployee/:id',(req, res)=>{
    registerEmployee.deleteEmployee(req, res);
});

//store entry time to make attendance of employee
router.post('/makeAttendance/:id',(req, res)=>{
    manageAttendance.makeAttendance(req, res);
});

//get specific employee attendance history
router.get('/getEmployeeAttendanceReport',(req, res)=>{
    manageAttendance.getAttendanceReport(req, res);
});

//Allocated projects to employees
router.post('/allocateProject',(req, res)=>{
    manageProject.allocateProject(req, res);
});

// find which project is allocated to specific employee
router.get('/getEmployeeProject',(req, res)=>{
    manageProject.getEmployeeProject(req, res);
});

// list of employee on a project
router.get('/listProjectEmployee',(req, res)=>{
    manageProject.getlistProjectEmployee(req, res);
});


//logout admin
router.post('/logout',(req, res)=>{
    adminService.logout(req, res);
});



export default router;
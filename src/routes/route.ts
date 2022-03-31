import { Router } from "express";
import registerEmployee from "../services/registration";
import manageAttendance from "../services/attendance";
import manageProject from "../services/allocateProject";

const router = Router();

//testing route
router.get('/',(req, res)=>{
    res.send('Landing page from router');
});


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
router.post('/getEmployeeAttendanceReport',(req, res)=>{
    manageAttendance.getAttendanceReport(req, res);
});

//Allocated projects to employees
router.post('/allocateProject',(req, res)=>{
    manageProject.allocateProject(req, res);
})

// find which project is allocated to specific employee
router.post('/getEmployeeProject',(req, res)=>{
    manageProject.getEmployeeProject(req, res);
})







export default router;
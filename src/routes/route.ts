import { Router } from "express";
import registerEmployee from "../services/registration";
import manageAttendance from "../services/attendance";

const router = Router();

//testing route
router.get('/',(req, res)=>{
    res.send('Landing page from router');
});


//Register new employee
router.post('/register-employee', async(req, res)=>{
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
})







export default router;
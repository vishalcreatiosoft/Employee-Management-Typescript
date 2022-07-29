import { Router } from "express";
import registerEmployee from "../services/registrationService";
import manageAttendance from "../services/attendanceService";
import manageProject from "../services/projectAllocationService";
import adminService from "../services/adminService";
import logger from "../logger/index";
const router = Router();



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
router.post('/register-admin',(req, res)=>{
    logger.info('This is register admin info');
    logger.warn('This is register admin warn');
    logger.error(new Error('This is register admin error'));
    adminService.registerAdmin(req, res);
})



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
router.post('/login',(req, res)=>{
    logger.info('This is login admin info',{ metaData : 'login' });
    logger.warn('This is login admin warn');
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
import EmployeeProject from '../models/allocate-project-model';
import Registration from '../models/register-emp-model';
import {Request, response, Response} from 'express';

class Project {

    async checkEmployeeExist(employeeId : string | number) : Promise<any> {
        
        const query : any = {};
        query.employeeId = employeeId;
        const getEmployee = await Registration.find(query);
        
        if(getEmployee.length === 0){
            return {success : false , result : `No Employee found with Id ${employeeId}`};
        }
        if(getEmployee.length !== 0){
            return {success : true , result : getEmployee};
        }
        
        
    }


    async allocateProject(req:Request, res:Response){

        const { employeeId } = req.body;
        const checkEmployee : any = await this.checkEmployeeExist(employeeId)

        if(!checkEmployee.success){
            res.send(checkEmployee.result);
        }

        if(checkEmployee.success){
            
            const { project, role, projectManager } = req.body;
            let query : any = {};
            query = {
                employeeId,
                name : `${checkEmployee.result[0].firstname} ${checkEmployee.result[0].lastname}`,
                project,
                role,
                projectManager
            }
            const employeeProject = new EmployeeProject(query);
            await employeeProject.save()
                .then((response:any) =>{
                    res.status(201).send({success : true, result : response});
                })
                .catch(()=>{
                    res.status(401).send({success : true, result : 'Unable to allocate project'});
                })
        }
    }

    async getEmployeeProject(req: Request, res: Response){

        const { employeeId } = req.body;
        const checkEmployee = await this.checkEmployeeExist(employeeId);
        if(!checkEmployee.success){
            res.send(checkEmployee.result);
        }
        if(checkEmployee.success){

            const query : any = {};
            query.employeeId = employeeId;
            await EmployeeProject.find(query)
                .then((response)=>{
                    res.status(201).send({success : true, result : response});
                })
                .catch((error)=>{
                    res.status(401).send({success : false, result : error});
                })

        }
    }

}


const project = new Project();
export default project;
import EntryTime from '../models/entry-model';
import Registration from '../models/register-emp-model';
import { Request,  Response } from 'express';



class ManageAttendance {


    checkEmployeeExists (id : string | number){
        return new Promise((resolve, reject)=>{
            Registration.findById(id)
                .then((response : any)=>{
                    resolve({success: true , result : response});
                })
                .catch(error => {
                    reject({success : false, result : 'No Employee found with this id'});
                })
        })
    }

    async makeAttendance (req : Request, res : Response){

        const { id } = req.params;
        const checkEmployee : any = await this.checkEmployeeExists(id);
        if(checkEmployee.success){

            const entryData = {
                employeeId : `${checkEmployee.result.employeeId}`,
                name : `${checkEmployee.result.firstname} ${checkEmployee.result.lastname}`   
            }
            const entryDetail = new EntryTime(entryData);
            await entryDetail.save()
                .then(()=>{
                    res.status(201).send({success : true, result : 'Attendance Marked'});
                }) 
                .catch((error: any)=>{
                    res.status(403).send({success : false, result : `Error occurred ${error}`})  
                })
            
        }
        else{
            res.status(401).send({success : false, result : 'Unauthorized Employee'});
        }
    }

    async getAttendanceReport(req:Request, res:Response){
        const employeeId = req.body.employeeId;
        const query : any = {}
        query.employeeId = employeeId;
        await EntryTime.find(query)
            .then((response)=>{
                res.status(201).send({success : true, result : response});
            })
            .catch(()=>{
                res.status(401).send({success : true, result : 'No Records found'});
            });
    }

    


}


const manageAttendance = new ManageAttendance();
export default manageAttendance; 
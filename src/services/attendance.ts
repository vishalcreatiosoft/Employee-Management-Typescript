import EntryTime from '../models/register-emp-model';
import Registration from '../models/register-emp-model';
import { Request, response, Response } from 'express';



class ManageAttendance {


    async checkEmployeeExists (id : string | number){
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



    async makeAttendance(req : Request, res : Response){

        const { id } = req.params;
        const checkEmployee : any = await this.checkEmployeeExists(id);
        if(checkEmployee.success){
            const entryTime = new EntryTime();
            const attendance : any = await entryTime.save(req.body)
            if(attendance){
                res.send({success : true, result : 'Attendance UpLoaded'});
            }else{
                res.send({success : false, result : 'Error in Attendance UpLoading'});
            }
        }
        


    }


}


const manageAttendance = new ManageAttendance();
export default manageAttendance; 
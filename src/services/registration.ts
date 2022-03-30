import Registration from '../models/register-emp-model';
import { Request, response, Response } from 'express';
import mongoose from 'mongoose';

class RegisterEmployee {

    //function to register new employee
    async registerEmp(req : Request, res : Response) {
  
        try{
            const register = new Registration(req.body);
            const data = await register.save()
                .then(data=>{
                    res.status(201).send({success : true, result : 'employee registered successfully'})
                }) 
                .catch(error=>{
                    res.status(403).send({success : true, result : 'employee data not found'})  
                })

        }catch(error){
            res.status(500).send('employee registration failed');        
        }

    }

    // function to get all employees data
    async getEmp(req : Request, res : Response) {

        const query : object = {}
            
        try{
            const data = await Registration.find(query) 
            .then(data=>{
                res.status(201).send({success : true, result : data})
            }) 
            .catch(error=>{
                res.status(403).send({success : true, result : 'employee data not found'})  
            }) 
        }catch(error){
            res.status(500).send('Unable to find employee data');        
        }

    }

    // function to get employee data by employee id
    async getEmpployeeById(req : Request, res : Response) {

        const { id } = req.params;
                   
        try{
            await Registration.findById(id) 
            .then(response=>{
                res.status(201).send({success : true, result : response})
            }) 
            .catch(error=>{
                res.status(403).send({success : true, result : 'employee data not found'})  
            })
        }catch(error){
            res.status(500).send('Unable to find employee data');        
        }

    }

    //function to update the employee data
    async editEmp(req : Request, res : Response) {

        try{
            const query : any = {};
            const { id } = req.params;
            query._id = new mongoose.Types.ObjectId(id);

            const { firstname, lastname, email, mobile, designation } = req.body;
            const updateKeys = {
                firstname,
                lastname, 
                email, 
                mobile,
                designation
            }
            
            const data = await Registration.updateOne(query, updateKeys)
            .then(data=>{
                res.status(201).send({success : true, result : 'employee updated successfully'})
            }) 
            .catch(error=>{
                res.status(403).send({success : true, result : 'employee data not found'})  
            })
    
        }catch(error){
            res.status(500).send('employee update failed');        
        }

    }


    async deleteEmployee(req : Request, res : Response) {

        const { id } = req.params;
        const query : any = {};
        query._id = new mongoose.Types.ObjectId(id);
                   
        try{
            await Registration.findOneAndDelete({_id : id}) 
            .then(response=>{
                res.status(201).send({success : true, result : 'employee deleted successfully'});
            }) 
            .catch(error=>{
                res.status(403).send({success : true, result : 'employee data not found'})  
            })
        }catch(error){
            res.status(500).send('Unable to delete employee data');        
        }

    }

}



const registerEmployee = new RegisterEmployee();
export default registerEmployee;
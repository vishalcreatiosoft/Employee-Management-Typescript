import AdminRegistration from '../models/admin-model';
import express, {Request, Response} from 'express';
import session , { SessionOptions } from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local'


class AdminService {

    async registerAdmin(req : Request, res : Response){
        
        const { role, name, email, mobile, password } = req.body;
        let query : any = {};
        query = {
            role,
            name,
            email,
            mobile,
            password
        }
         
        const adminRegistration = new AdminRegistration(query);
        await adminRegistration.save()
            .then((response)=>{
                res.status(201).send({success : true, response : response, result : 'Admin Registered Successfully'});
            })
            .catch(()=>{
                res.status(401).send({success : true, result : 'Error in admin registration'});
            });
    }
 
}


const adminService = new AdminService();
export default adminService;
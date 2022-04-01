import AdminRegistration from '../models/admin-model';
import MongoStore from 'connect-mongo';
import express, {Request, Response} from 'express';
import session , { SessionOptions } from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt';

const openRoutes = [
    { uri: '/login', method: 'POST' }
];

class AdminService {
 

    async registerAdmin(req : Request, res : Response){
        
        const { role, name, email, mobile, password } = req.body;
        let query : any = {};

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword : string = await bcrypt.hash(password, salt)

        query = {
            role,
            name,
            email,
            mobile,
            encryptedPassword
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

   
    config(app: express.Application) {
        
        const sessionParams : SessionOptions = {
            
            secret: process.env.SESSION_SECRET || 'secretKey',
            resave: false,
            saveUninitialized: true,
            store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/employeeDb' }),
            cookie: {
                secure: process.env.ENABLE_HTTPS === "true",
                path: '/',
                maxAge: 1000 * 60 * 24, // 1 hour
                sameSite: 'lax',
                httpOnly: true
            }
        };

        app.use(session(sessionParams));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use((req, res, next) => {
            if (!this.isOpen(req) && !req.isAuthenticated()) {
                res.status(403).send({success : false, result : 'Not authenticated'});
            } else {
                next();
            }
        });

        passport.use(new passportLocal.Strategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },         
            async(username, password, done) => {
                
            let query : any = {};
            query = {
                username
            }    
            const getAdminDetail = await AdminRegistration.find(query)

            if(getAdminDetail.length !== 0){
               
                const passwordCompare = await bcrypt.compare(password, getAdminDetail[0].encryptedPassword,function(err, result) {
                    if(result){
                        done(null, { username: getAdminDetail[0].email });
                    }else if(err){
                        done(new Error('Invalid Password'));
                    }
                });
            }else if(getAdminDetail.length !== 0){
                done(new Error('Invalid Email'));
            }
                       

        }));

        passport.serializeUser(function (user : any, done) {
            done(null, user);
        });

        passport.deserializeUser(function (obj : any, done) {
            done(null, obj);
        });

    }

    loginAdmin(req: Request, res: Response) {
        
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(401).send({ success: false, info: err.message });
            }
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).send({ success: false, info: err.message });
                } else {
                    return res.send({ success: true , result : 'Logged In Successfully'});
                }
            });
        })(req, res);
    }

    logout(req: Request, res: Response) {
        req.logout();
        res.send({success : true , result : 'Logged Out Successfully'});
    };

    isOpen(req: Request) {
        for (const route of openRoutes) {
            if (route.uri === req.url && route.method === req.method) {
                return true;
            }
        }
        return false;
    }

   
 
}


const adminService = new AdminService();
export default adminService;
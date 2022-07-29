"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_model_1 = __importDefault(require("../models/admin-model"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const openRoutes = [
    { uri: '/login', method: 'POST' }
];
class AdminService {
    registerAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role, name, email, mobile, password } = req.body;
            let query = {};
            const salt = yield bcrypt_1.default.genSalt(10);
            const encryptedPassword = yield bcrypt_1.default.hash(password, salt);
            query = {
                role,
                name,
                email,
                mobile,
                encryptedPassword
            };
            const adminRegistration = new admin_model_1.default(query);
            yield adminRegistration.save()
                .then((response) => {
                res.status(201).send({ success: true, response: response, result: 'Admin Registered Successfully' });
            })
                .catch(() => {
                res.status(401).send({ success: true, result: 'Error in admin registration' });
            });
        });
    }
    config(app) {
        const sessionParams = {
            secret: process.env.SESSION_SECRET || 'secretKey',
            resave: false,
            saveUninitialized: true,
            store: connect_mongo_1.default.create({ mongoUrl: 'mongodb://localhost:27017/employeeDb' }),
            cookie: {
                secure: process.env.ENABLE_HTTPS === "true",
                path: '/',
                maxAge: 1000 * 60 * 24,
                sameSite: 'lax',
                httpOnly: true
            }
        };
        app.use((0, express_session_1.default)(sessionParams));
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        // app.use((req, res, next) => {
        //     if (!this.isOpen(req) && !req.isAuthenticated()) {
        //         res.status(403).send({success : false, result : 'Not authenticated'});
        //     } else {
        //         next();
        //     }
        // });
        passport_1.default.use(new passport_local_1.default.Strategy({
            usernameField: 'email',
            passwordField: 'password'
        }, (username, password, done) => __awaiter(this, void 0, void 0, function* () {
            let query = {};
            query = {
                username
            };
            const getAdminDetail = yield admin_model_1.default.find(query);
            if (getAdminDetail.length !== 0) {
                const passwordCompare = yield bcrypt_1.default.compare(password, getAdminDetail[0].encryptedPassword, function (err, result) {
                    if (result) {
                        done(null, { username: getAdminDetail[0].email });
                    }
                    else if (err) {
                        done(new Error('Invalid Password'));
                    }
                });
            }
            else if (getAdminDetail.length !== 0) {
                done(new Error('Invalid Email'));
            }
        })));
        passport_1.default.serializeUser(function (user, done) {
            done(null, user);
        });
        passport_1.default.deserializeUser(function (obj, done) {
            done(null, obj);
        });
    }
    loginAdmin(req, res) {
        passport_1.default.authenticate('local', (err, user, info) => {
            console.log('inside authenticate method ===>');
            if (err) {
                console.log('inside error', err);
                return res.status(401).send({ success: false, info: err.message });
            }
            req.login(user, (err) => {
                console.log('inside req.login ');
                if (err) {
                    return res.status(500).send({ success: false, info: err.message });
                }
                else {
                    return res.send({ success: true, result: 'Logged In Successfully' });
                }
            });
        })(req, res);
    }
    logout(req, res) {
        req.logout();
        res.send({ success: true, result: 'Logged Out Successfully' });
    }
    ;
    isOpen(req) {
        for (const route of openRoutes) {
            if (route.uri === req.url && route.method === req.method) {
                return true;
            }
        }
        return false;
    }
}
const adminService = new AdminService();
exports.default = adminService;

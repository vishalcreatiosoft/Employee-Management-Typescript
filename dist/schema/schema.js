"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @openapi
 * components:
 *   schemas:
 *     registerAdmin:
 *        type: object
 *        required:
 *           - role
 *           - name
 *           - email
 *           - mobile
 *           - password
 *        properties:
 *           role:
 *             type: string
 *             default : "default admin"
 *           name:
 *             type: string
 *             default : "name"
 *           email:
 *             type : string
 *             default: "email"
 *           mobile:
 *             type: number
 *             default: 1111111111
 *           password:
 *             type: string
 *             default: "password"
 *     loginAdmin:
 *        type: object
 *        required:
 *           - email
 *           - password
 *        properties:
 *           email:
 *             type : string
 *             default: "abc@gmail.com"
 *           password:
 *             type: string
 *             default: "123456"
 *     loginResponse:
 *        type: object
 *        properties:
 *           success:
 *             type: boolean
 *             default: true
 *           result:
 *             type: string
 *             default: "logged in successfully"
 *
 *
 *
 */ 

import { Schema, model } from "mongoose";
import { ProjectType } from "../interfaces/interface";

const allocateProjectSchema = new Schema<ProjectType>({
    
    employeeId : {
        type : String,
    },
    name : {
        type : String
    },
    project : {
        type : String
    },
    role : {
        type : String
    },
    projectManager : {
        type : String
    }
},{
    versionKey: false,
    timestamps : { createdAt : true, updatedAt : false} 
});

export default model<ProjectType>('EmployeeProject',allocateProjectSchema,'projectsDb');
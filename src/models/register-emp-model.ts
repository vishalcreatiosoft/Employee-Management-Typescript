import { Schema, model }from "mongoose";
import { EmployeeType } from "../interfaces/interface";


const EmployeeSchema = new Schema<EmployeeType>({

    firstname : {
        type : String,
        trim : true,
    },
    lastname : {
        type : String,
        trim : true,
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    mobile : {
        type : Number,
        trim : true,
        unique : true
    },
    designation : {
        type : String,
        trim : true,
    },
    salary : {
        type : Number,
        trim : true
    }

});


export default model<EmployeeType>('Registration', EmployeeSchema);

import { Schema,model } from "mongoose";
import { AdminType } from "../interfaces/interface";

const adminSchema = new Schema<AdminType>({

    role : {
        type : String,
        trim : true
    },
    name : {
        type : String,
        trim : true,
    },
    email : {
        type : String,
        trim : true,
        unique : true,
    },
    mobile : {
        type : Number,
        trim : true,
        unique : true

    },
    encryptedPassword : {
        type : String,
        trim : true,
    }

},{
    versionKey: false
})

export default model<AdminType>('AdminRegistration',adminSchema,'adminDb');
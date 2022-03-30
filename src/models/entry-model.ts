import{ Schema, model} from "mongoose";
import { EntrySchemaType } from "../interfaces/interface";

const EntrySchema = new Schema<EntrySchemaType>({

       firstname : {
        type : String,
        trim : true
    },
    lastname : {
        type : String,
        trim : true
    },
    createdAt : {
        required : true,
        type : Date,
        Default : Date.now
    } 
    
});

export default model<EntrySchemaType>('EntryTime',EntrySchema,'attendanceReport');
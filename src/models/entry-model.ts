import{ Schema, model} from "mongoose";
import { EntrySchemaType } from "../interfaces/interface";

const EntrySchema = new Schema<EntrySchemaType>({

    employeeId : {
        type : String
    },
    name : {
        type : String
    }
},{
    timestamps: { createdAt: true, updatedAt: false }
});

export default model<EntrySchemaType>('EntryTime',EntrySchema,'attendanceReport');
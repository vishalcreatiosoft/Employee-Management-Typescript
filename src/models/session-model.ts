import { Schema , model } from 'mongoose';

const sessionSchema = new Schema({

    cookie : {
        type : String
    }


},{
    versionKey : false,
    timestamps: { createdAt: true, updatedAt: false }
});

export default model('Session',sessionSchema,'sessionDb');

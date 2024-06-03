import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    password:String,
    role:{type:String,enum:["admin" ,"customer"],default:"customer"},
    otp: {type: String},

})

const Schema = mongoose.model('Schema', userSchema);

export default Schema;

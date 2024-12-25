import { type } from "@testing-library/user-event/dist/type";
import mongoose from "mongoose";


import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,reuired:true},
    image:{type:String},
    address:{type:Object,default: {line1: '',line2:''}},
    gender:{type:String,default:"Not Selected"},
    DOB:{type:String,default:"Not Selected"},
    phone:{type:String,default:'000000000'}
})
const userrModel = mongoose.models.doctor||mongoose.model('user',userSchema)

export default userrModel
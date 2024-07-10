import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";



const userSchema=new Schema<TUser>({
  id:{
    type:String,
    require:true
  },

  password:{
    type:String,
    require:true
  },
  needspasswordChange:{
    type:Boolean,
    default:true
  },
  role:{
    type:String,
    enum:['student','faculty','admin ']
  },
  status:{
    type:String,
    enum:['in-progress','blocked']
  },
  isDeleted:{
    type:Boolean,
   default:false
  }
},{
  timestamps:true
})

const User =model<TUser>('User',userSchema)
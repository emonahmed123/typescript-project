import { Schema, Types, model } from 'mongoose';

import {
  TLocalGuardian,

 TStudent,
  // StudentMethod,
  StudentModle,
  TUserName,
  TGuardian,
} from './stduent.interfeace';
import validator from 'validator';
import { any } from 'joi';
import config from '../../config';
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is required'],
    maxlength: [20, 'First Name can not be more than 20'],
    validate: {
      validator: function (value: any) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        if (value !== firstNameStr) {
          return false;
        }
        return true;
      },
      message: '{VALUE} IS NOT CAPITAILIZE FORMAT',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],

    validate: {
      validator: (value: string) => validator.isAlpha(value),
    },
    message: '{VALUE} IS NOT VALID',
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact No is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact No is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
});

const studentSchema = new Schema<TStudent ,StudentModle>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  user:{
    type:Schema.Types.ObjectId,
    required:[true,'User ID is Requried'],
    unique:true,
    ref:'User'
  },

  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not vaild email type   ',
    },
  },
  contactNo: { type: String, required: [true, 'Contact No is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact No is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddres: {
    type: String,
    required: [true, 'Permanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian is required'],
  },
  profileImg: { type: String },

  isDeleted:{
    type:Boolean,
    default:false
  }
},{

 toJSON:{
  virtuals:true
 }
}
);


//virtual 

studentSchema.virtual('fullName').get(function(){
  return (
    `${this.name.firstName}  ${this.name.lastName}`
  )
})

//custom instance method

// studentSchema.methods.isUserExits=async function (id:string) {
//   const existingUser =await Student.findOne({id})

//   return existingUser
// }

//pre save middeaware /hook




// query middeleware

studentSchema.pre('find',function(next){

this.find({isDeleted:{$ne:true}});
next()

})
studentSchema.pre('findOne',function(next){

this.find({isDeleted:{$ne:true}});
next()

})



studentSchema.statics.isUserExits=async function (id:string) {
  const  existingUser =await Student.findOne({id});
  return existingUser
}

export const Student= model<TStudent,StudentModle>('Student', studentSchema);

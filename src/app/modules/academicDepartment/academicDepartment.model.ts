import { Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';
import config from '../../config';

import { TAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import AppError from '../../error/appError';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required:true
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartemntExits = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartemntExits) {
    throw new Error('This Department is already exist!');
  }
  next();
});
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department does not exist! ',
    );
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);

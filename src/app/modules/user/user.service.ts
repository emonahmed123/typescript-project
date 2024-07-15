import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { TAcademicSemester } from '../AcademicSemester/academicSemseter.interface';
import { TStudent } from '../stduent/stduent.interfeace';
import { Student } from '../stduent/stduent.model';
import { NewUser, TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../error/appError';
import httpStatus from 'http-status';

const createStduentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  //if password is not given ,use default password

  userData.password = password || (config.default_pass as string);

  const generatedStudentId = (payload: TAcademicSemester) => {};

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id (transaxtion-1)
    userData.id = await generateStudentId(admissionSemester);

    //set stduent role

    // userData.role = 'student';

    // userData.id = '202000001';

    //create a user

    const newUser = await User.create([userData], { session }); // age selo objects transaxitn user korror karoni hoi gese array

    // create a stuendt

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Falid to create user');

      //set id ,_id as user
    }

    payload.id = newUser[0].id;

    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Falid to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error('Failed to create student');
  }
};

export const UserSeverice = {
  createStduentIntoDB,
};

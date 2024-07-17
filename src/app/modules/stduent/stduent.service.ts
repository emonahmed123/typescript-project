import mongoose from 'mongoose';
import { TStudent } from './stduent.interfeace';
import { Student } from './stduent.model';
import AppError from '../../error/appError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';

 const studentSearchableFields = [
  'email',
  'name.firstName',
  'presentAddress',
];
const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExits(studentData.id)) {
    throw new Error('User Alreay Exists');
  }

  const result = await Student.create(studentData);
  //built in static method

  //   const stduent=new Student(studentData)

  //   if(await stduent.isUserExits(studentData.id)){
  //     throw new Error('User Alreay Exists')
  //   }

  // const result = await stduent.save() // build in Instance

  return result;
};


const getAllStudentsFromDB = async (query:Record<string,unknown>) => {

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
     query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;

 
};



const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};


const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },

      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete student ');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete user ');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error('student not Deleted')
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  createStudentIntoDb,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};

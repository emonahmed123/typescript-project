import { TStudent } from './stduent.interfeace';
import { Student } from './stduent.model';

const createStudentIntoDb = async (studentData: TStudent) => {
  if(await Student.isUserExits(studentData.id)){
    throw new Error('User Alreay Exists')
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

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id },{isDeleted:true});
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  createStudentIntoDb,
  getSingleStudentFromDB,
  deleteStudentFromDB 
};

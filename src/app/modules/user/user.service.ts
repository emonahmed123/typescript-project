import config from '../../config';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { TAcademicSemester } from '../AcademicSemester/academicSemseter.interface';
import { TStudent } from '../stduent/stduent.interfeace';
import { Student } from '../stduent/stduent.model';
import { NewUser, TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStduentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  //if password is not given ,use default password

  userData.password = password || (config.default_pass as string);


const generatedStudentId=(payload:TAcademicSemester)=>{


}


  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //set  generated id
  userData.id = await generateStudentId(admissionSemester);








  //set stduent role

  // userData.role = 'student';

  // userData.id = '202000001';

  //create a user

  const newUser = await User.create(userData);

  // create a stuendt

  if (Object.keys(newUser).length) {
    //set id ,_id as user
    payload.id = newUser.id;

    payload.user = newUser._id;

    const newStudent = await Student.create(payload);

    return newStudent;
  }
};

export const UserSeverice = {
  createStduentIntoDB,
};

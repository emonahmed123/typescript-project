import config from '../../config';
import { TStudent } from '../stduent/stduent.interfeace';
import { Student } from '../stduent/stduent.model';
import { NewUser, TUser } from './user.interface';
import { User } from './user.model';

const createStduentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  //if password is not given ,use default password

  userData.password = password || (config.default_pass as string);

  //set stduent role

  userData.role = 'student';

  userData.id = '202000001';

  //create a user

  const newUser = await User.create(userData);

  // create a stuendt

  if (Object.keys(newUser).length) {
    //set id ,_id as user
    studentData.id = newUser.id;

    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);

    return newStudent;
  }
};

export const UserSeverice = {
  createStduentIntoDB,
};

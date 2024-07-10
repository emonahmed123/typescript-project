import { Request, Response } from 'express';
import { UserSeverice } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserSeverice.createStduentIntoDB(
      password,
      studentData,
    );

    res.status(200).json({
      success: true,
      data: result,
      message: 'Student is created succesfully',
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const UserController = {
  createStudent,
};

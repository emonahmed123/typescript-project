import { NextFunction, Request, Response } from 'express';
import { UserSeverice } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserSeverice.createStduentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Stduent is created succesfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
    throw new Error('Failed to create student');
  }
};

export const UserController = {
  createStudent,
};

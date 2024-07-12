import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './stduent.service';
// import Joi from 'joi';
// import studentValidationSchema from './student.validation';

import { promise, z } from 'zod';
import studentValidationSchema from './student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';



const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: stduentData } = req.body;

    // const { error, value } = studentValidationSchema.validate(stduentData);

    const zodparseData = studentValidationSchema.parse(stduentData);

    // const result = await 
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something wrong',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      data: err,
    });
  }
};


const getAllStudents =catchAsync(  async (req: Request, res: Response,next:NextFunction) => {
 
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Stduent isretrieved succesfully',
      data:result
    })
});



const getSingleStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
  
    next(err)
  }
};



const deleteStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
   next(err)
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};

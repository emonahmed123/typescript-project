import { Request, Response } from 'express';
import { StudentServices } from './stduent.service';
// import Joi from 'joi';
// import studentValidationSchema from './student.validation';

import { z } from "zod";
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: stduentData } = req.body;

    // const { error, value } = studentValidationSchema.validate(stduentData);

 const zodparseData = studentValidationSchema.parse(stduentData)


    const result = await StudentServices.createStudentIntoDb(zodparseData);
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
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message||'something went wrong',
      data: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Student is retrieved succesfully',
      data: err,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Not delete',
      data: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
};

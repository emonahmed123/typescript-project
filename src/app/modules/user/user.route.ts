import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.conroller';
import { AnyZodObject } from 'zod';
import { studentValidations} from '../stduent/student.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();





router.post('/create-student',validateRequest(  studentValidations.createstudentValidationSchema) , UserController.createStudent);

export const userRoutes = router;

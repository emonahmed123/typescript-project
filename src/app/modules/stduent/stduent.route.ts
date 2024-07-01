import express from 'express';
import { StudentController } from './stduent.controller';

const router = express.Router();

router.post('/create-stduent', StudentController.createStudent);

router.get('/', StudentController.getAllStudents);

router.get('/:studentId', StudentController.getSingleStudent);

export const StudentRoutes = router;

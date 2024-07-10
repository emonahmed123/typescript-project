import express from 'express';
import { StudentController } from './stduent.controller';

const router = express.Router();

router.post('/stduent-create', StudentController.createStudent);

router.get('/', StudentController.getAllStudents);

router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;

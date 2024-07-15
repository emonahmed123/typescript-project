import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import { StudentController } from './stduent.controller';

const router = express.Router();

router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deleteStudent);

router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;

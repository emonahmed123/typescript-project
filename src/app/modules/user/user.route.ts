import express from 'express';
import { UserController } from './user.conroller';

const router = express.Router();

router.post('/create-student', UserController.createStudent);

export const userRoutes = router;
import express from 'express';
import { validate } from '../../middleware/validate';
import { registerUserSchema } from './user.schema';
import { registerUserHandler } from './user.controller';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUserHandler);

export default router;
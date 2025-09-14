import express from 'express';
import { validate } from '../../middleware/validate';
import { registerUserSchema, loginUserSchema } from './user.schema';
import { registerUserHandler, loginUserHandler, getMeHandler } from './user.controller';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUserHandler);
router.post('/login', validate(loginUserSchema), loginUserHandler);

//protected route
router.get('/me', auth, getMeHandler);

export default router;
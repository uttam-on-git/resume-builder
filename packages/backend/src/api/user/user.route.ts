import express from 'express';
import { validate } from '../../middleware/validate';
import { registerUserSchema, loginUserSchema, requestPasswordResetSchema, resetPasswordSchema } from './user.schema';
import { registerUserHandler, loginUserHandler, getMeHandler, verifyEmailHandler, requestPasswordResetHandler, resetPasswordHandler, logoutUserHandler } from './user.controller';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUserHandler);
router.post('/login', validate(loginUserSchema), loginUserHandler);
router.get('/verify-email', verifyEmailHandler);
router.post('/request-password-reset', validate(requestPasswordResetSchema), requestPasswordResetHandler);
router.post('/reset-password', validate(resetPasswordSchema), resetPasswordHandler);
router.post('/logout', logoutUserHandler);

//protected route
router.get('/me', auth, getMeHandler);

export default router;
// @ts-nocheck
import { Router } from 'express';

import { AuthController } from '../conrollers/auth.controller';
import { authConfirmationCodeValidation, authPostValidation, authRegistrationDataValidation, authResendEmailConfirmationValidation, emailForPasswordRecoveryValidation } from '../validators/auth.validator';
import { authMiddleware } from '../middlewares/auth/auth.middleware';
import { rateLimitMiddleware } from '../middlewares/rateLimit/rateLimit.middleware';
import { refreshTokenMiddleware } from '../middlewares/refreshToken/refreshToken.middleware';

export const authRouter = Router();

authRouter.post('/login', rateLimitMiddleware, authPostValidation(), AuthController.postLogin);
authRouter.get('/me', authMiddleware, AuthController.getUser);
authRouter.post('/registration', rateLimitMiddleware, authRegistrationDataValidation(), AuthController.postRegistration);
authRouter.post('/registration-confirmation', rateLimitMiddleware, authConfirmationCodeValidation(), AuthController.confirmRegistration);
authRouter.post('/registration-email-resending', rateLimitMiddleware, authResendEmailConfirmationValidation(), AuthController.resendEmail);
authRouter.post('/refresh-token', AuthController.refresh);
authRouter.post('/logout', refreshTokenMiddleware, AuthController.logout);
authRouter.post('/password-recovery', rateLimitMiddleware, emailForPasswordRecoveryValidation(), AuthController.recoveryPassword);

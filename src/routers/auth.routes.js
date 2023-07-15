import dotenv from 'dotenv'
import { signUp, signIn, logout, getSession } from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { authValidation } from '../middlewares/authValidation.middleware.js'
import { signupSchema, loginSchema } from '../schemas/auth.schemas.js'
import { Router } from 'express';

dotenv.config();

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signupSchema), signUp);
authRouter.post('/login', validateSchema(loginSchema), signIn);
authRouter.post('/logout', authValidation, logout);
authRouter.get('/session/:token', getSession);

export default authRouter;
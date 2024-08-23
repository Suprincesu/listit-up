import { Request, Response } from 'express';
import * as AuthService from './auth.service';
import httpStatus from 'http-status';
import asyncWrapper from '../../core/utils/asyncWrapper.util';

export const signUp = asyncWrapper(async (req: Request, res: Response) => {
	const { user, token } = await AuthService.handleSignup(req.body);
	res.status(httpStatus.CREATED).json({ ok: true, message: 'Signup successfully', data: user, token });
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
	const { user, token } = await AuthService.handleLogin(req.body);
	res.status(httpStatus.OK).json({ ok: true, message: 'User logged in sucessful', data: user, token });
});

import { IAuthDTO } from './auth.interface';
import User from '../users/user.model';
import AppError from '../../core/utils/error.util';
import httpStatus from 'http-status';
import { createToken } from '../../core/utils/jwt.util';
import * as bcrypt from 'bcryptjs';

export const handleSignup = async (data: IAuthDTO) => {
	try {
		const checkUser = await User.findOne({ email: data.email });
		if (checkUser) {
			throw new AppError(httpStatus.FORBIDDEN, `Email already taken`);
		}
		const user = await User.create({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
		});
		const token: string = createToken(user);
		return { user: user.toJSON(), token };
	} catch (e) {
		throw new AppError(httpStatus.BAD_REQUEST, e);
	}
};

export const handleLogin = async (data: IAuthDTO) => {
	const user = await User.findOne({ email: data.email });
	if (!user) {
		throw new AppError(httpStatus.UNAUTHORIZED, `Invalid credentials`);
	}
	if (!bcrypt.compareSync(data.password, user.password)) {
		throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
	}
	const token = createToken(user);
	return { user: user.toJSON(), token };
};

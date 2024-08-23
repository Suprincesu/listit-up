import * as Joi from 'joi';

export const signUpValidation = {
	body: Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required(),
		confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
			'any.only': 'Password and Confirm Password must match',
			'any.required': 'Confirm Password is required',
		}),
	}),
};

export const loginValidation = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required(),
	}),
};

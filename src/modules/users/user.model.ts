import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: false,
		},
		lastName: {
			type: String,
			required: false,
		},
		image: {
			type: String,
			required: false,
		},
		contactNumber: {
			type: String,
			required: false,
			default: '',
		},
		profileSetup: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
	next();
});

const User = mongoose.model<IUser>('Users', userSchema);

export default User;

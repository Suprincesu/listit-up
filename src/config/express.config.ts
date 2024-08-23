import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoute from '../modules/auth/auth.route';
import userRoute from '../modules/users/user.route';
import messageRoute from '../modules/message/message.route';
import http from 'http';
import errorHandlerUtil from '../core/utils/error-handler.util';
import errorHandling from '../core/middleware/errorHandling.middleware';
import { corsOption } from './cors.config';
import { setUpSocket } from './socket.config';

const app: Application = express();
const databaseURL = process.env.DATABASE_URI;

// Registering Middlewares
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(errorHandling);

// Defining routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/message', messageRoute);

// Mongoose connection
mongoose
	.connect(databaseURL)
	.then(() => {
		console.log(`DB Connected successfully`);
	})
	.catch((err) => {
		console.error(err.message);
	});

const server = http.createServer(app);
setUpSocket(server);

const exitHandler = (): void => {
	if (app) {
		server.close(() => {
			console.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error: Error): void => {
	errorHandlerUtil.handleError(error);
	if (!errorHandlerUtil.isTrustedError(error)) {
		exitHandler();
	}
};

process.on('uncaughtException', unexpectedErrorHandler);

process.on('unhandledRejection', (reason: Error) => {
	console.error('Unhandled rejection !!!!!!');
	throw reason;
});

export default server;

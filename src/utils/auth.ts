import * as fs from 'fs';
import { join } from 'path';
import jwt = require('jsonwebtoken');
import { findStaffById } from '../components/staff/staff.DAL';
import { findStudentById } from '../components/student/student.DAL';
import HttpException from './error.utils';
import USER_ERROR_CODES from './user.error';

/**
 * Middleware to verify token and User from DB
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express next function
 */
// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
	// console.log(req.headers);
	const authToken = req.header('Authorization').replace('Bearer ', '');
	// const { authToken } = req.headers;

	// console.log(authToken);
	if (!authToken) {
		return next(
			new HttpException(
				401,
				USER_ERROR_CODES.UNAUTHENTICATED,
				'UNAUTHENTICATED',
				null,
			),
		);
	}
	const privateKey = fs.readFileSync(
		join(__dirname, '../../keys/Private.key'),
	);
	try {
		const { id, role } = jwt.verify(authToken, privateKey);
		// console.log(obj);
		// const { id, role } = obj;
		// if(role==='student'){
		// }
		// const user1 = await findStudentById(id);
		const user =
			role === 'student'
				? await findStudentById(id)
				: await findStaffById(id);
		if (user.authToken !== authToken) {
			return next(
				new HttpException(
					401,
					USER_ERROR_CODES.UNAUTHENTICATED,
					'UNAUTHENTICATED',
					null,
				),
			);
		}
		req.id = id;
		req.role = role;
		next();
	} catch (error) {
		return next(
			new HttpException(
				401,
				USER_ERROR_CODES.UNAUTHENTICATED,
				'UNAUTHENTICATED',
				null,
			),
		);
	}
};

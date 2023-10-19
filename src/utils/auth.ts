import * as fs from 'fs';
import { join } from 'path';
import jwt = require('jsonwebtoken');
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
	console.log("hii")
    const authToken=req.header('Authorization').replace('Bearer ','');
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
		const { id, phone_no, role,department } = jwt.verify(authToken, privateKey);
		const user = await findStudentById(id);
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
        req.role=role;
		req.phone_no = phone_no;
		req.department = department;
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

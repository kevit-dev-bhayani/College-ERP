// /* eslint-disable no-restricted-syntax */
// /* eslint-disable guard-for-in */
import * as fs from 'fs';
import { join } from 'path';
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');
import HttpException from '../../utils/error.utils';
import USER_ERROR_CODES from '../../utils/user.error';
import { findDepartmentByInitialize } from '../department/department.DAL';
import {
	createNewStudent,
	findStudents,
	findStudentById,
	// findStudentsByDepartmentInit,
	findStudentByPhoneNo,
	deleteStudentById,
	// findStudentsByDepartmentId,
} from './student.DAL';

class StudentsController {
	/**
	 * Create new student and attach to the organization
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 * @param {NextFunction} next => Express next function
	 */
	async createStudents(req, res, next) {
		try {
			const studentObject = req.body;
			const { department_init } = req.body;
			const department =
				await findDepartmentByInitialize(department_init);
			if (!department) {
				throw new Error('plz enter valid department_init');
			} else {
				studentObject.department_id = department._id;
			}
			const student = await createNewStudent(studentObject);
			return res.status(201).send({ data: student });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * List Students
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 * @param {NextFunction} next => Express next function
	 */
	async getStudents(req, res, next) {
		try {
			const students = await findStudents();
			return res.status(200).send({ data: students });
		} catch (err) {
			return next(err);
		}
	}
	/**
	 * find Student by id
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 * @param {NextFunction} next => Express next function
	 */
	async findStudent(req, res, next) {
		try {
			const student = await findStudentById(req.id);
			if (student) {
				return res.status(200).send({ data: student });
			}
			throw new Error('Id not found');
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Updates Logged-in Student
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 * @param {NextFunction} next => Express next function
	 */
	async updateStudent(req, res, next) {
		try {
			// const { id } = req.id;
			const student = await findStudentById(req.id);
			if (!student) {
				return next(
					new HttpException(
						404,
						USER_ERROR_CODES.USER_ID_NOT_FOUND,
						'STUDENT_NOT_FOUND',
						null,
					),
				);
			}

			for (const field in req.body) {
				if (field === 'department_init') {
					// eslint-disable-next-line no-await-in-loop
					const studentDept = await findDepartmentByInitialize(
						student.department_init,
					);
					if (studentDept.initialize !== req.body[field]) {
						// eslint-disable-next-line no-await-in-loop
						const department = await findDepartmentByInitialize(
							req.body[field],
						);
						if (!department) {
							// eslint-disable-next-line no-await-in-loop
							throw new Error('plz enter valid department');
						} else {
							student.department_init = department.initialize;
						}
					}
				} else {
					student[field] = req.body[field];
				}
			}
			await student.save();
			return res.status(200).send({ data: student });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Deletes Student
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 * @param {NextFunction} next => Express next function
	 */
	async deleteStudent(req, res, next) {
		try {
			// const { id } = req.id;
			const student = await findStudentById(req.id);
			if (!student) {
				return next(
					new HttpException(
						404,
						USER_ERROR_CODES.USER_ID_NOT_FOUND,
						'USER_NOT_FOUND',
						null,
					),
				);
			}
			await deleteStudentById(req.id);
			// const students = await findStudentsByDepartmentInit(req.department_init);
			// if (students.length === 0) {
			// 	const department = await findStudentsByDepartmentInit(req.department_id);
			// 	department.delete();
			// }
			return res.status(200).send({ data: student });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Logs Out Student
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 * @param {NextFunction} next => Express next function
	 */
	async logoutStudent(req, res, next) {
		try {
			// const { id } = req.id;
			// console.log(id);
			const student = await findStudentById(req.id);
			if (!student) {
				return next(
					new HttpException(
						404,
						USER_ERROR_CODES.USER_ID_NOT_FOUND,
						'STUDENT_NOT_FOUND',
						null,
					),
				);
			}
			student.authToken = undefined;
			await student.save();
			return res.status(200).send({ data: student });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Allows Student to Login
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 * @param {NextFunction} next => Express next function
	 */
	async loginStudent(req, res, next) {
		try {
			const { phone_no, password } = req.body;
			if (!phone_no || !password) {
				return next(
					new HttpException(
						400,
						USER_ERROR_CODES.PHONE_NO_OR_PASSWORD_NOT_FOUND,
						'PHONE_NO_OR_PASSWORD_NOT_FOUND',
						null,
					),
				);
			}
			const student = await findStudentByPhoneNo(phone_no);
			if (student) {
				const match = await bcrypt.compare(password, student.password);
				if (match) {
					const privateKey = fs.readFileSync(
						join(__dirname, '../../../keys/Private.key'),
					);
					const token = await jwt.sign(
						{
							id: student.id,
							phone_no: student.phone_no,
							department_id: student.department_init,
							role: student.role,
						},
						privateKey,
						{ algorithm: 'RS256' },
					);
					student.authToken = token;
					await student.save();
					return res.status(200).send({ authToken: token });
				}
				return next(
					new HttpException(
						401,
						USER_ERROR_CODES.UNAUTHENTICATED,
						'UNAUTHENTICATED',
						null,
					),
				);
			}
			return next(
				new HttpException(
					401,
					USER_ERROR_CODES.USER_NOT_FOUND,
					'STUDENT_NOT_FOUND',
					null,
				),
			);
		} catch (err) {
			return next(err);
		}
	}
}

export default StudentsController;

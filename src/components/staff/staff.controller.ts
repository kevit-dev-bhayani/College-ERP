// /* eslint-disable no-restricted-syntax */
// /* eslint-disable guard-for-in */
import * as fs from 'fs';
import { join } from 'path';
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');
import HttpException from '../../utils/error.utils';
import USER_ERROR_CODES from '../../utils/user.error';
import {
	findDepartmentByInitialize,
} from '../department/department.DAL';
import {
	createNewStaff,
	findStaffs ,
	findStaffById ,
	// findStaffByDepartmentInit,
	findStaffByPhoneNo,
	deleteStaffById,
	// findStaff ByDepartmentId,
} from './staff.DAL';


class StaffController {
	/**
	 * Create new staff and attach to the organization
	 * @param {Request} req => Express Request
	 * @param {Response} res => Express Response
	 * @param {NextFunction} next => Express next function
	 */
	async createStaff(req, res, next) {
		try {
			const staffObject = req.body;
			const { department_init } = req.body;
			const department = await findDepartmentByInitialize(department_init);
			if (!department) {
				throw new Error('plz enter valid department_init');
			} else {
				staffObject.department_id = department._id;
			}
			const staff = await createNewStaff(staffObject);
			return res.status(200).send({ data: staff });
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
	async getStaff(req, res, next) {
		try {
			const staffs = await findStaffs ();
			return res.status(200).send({ data: staffs });
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
	async findStaff(req, res, next) {
		try {
			const staff = await findStaffById (req.params.id);
            if(staff){
                return res.status(200).send({ data: staff });
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
	async updateStaff(req, res, next) {
		try {
			// const { id } = req.id;
			const staff = await findStaffById (req.params.id);
			if (!staff) {
				return next(
					new HttpException(
						404,
						USER_ERROR_CODES.USER_ID_NOT_FOUND,
						'Staff_NOT_FOUND',
						null,
					),
				);
			}

			for (const field in req.body) {
				if (field === 'department_init') {
					// eslint-disable-next-line no-await-in-loop
					const staffDept = await findDepartmentByInitialize(staff.department_init);
					if (staffDept.initialize !== req.body[field]) {
						// eslint-disable-next-line no-await-in-loop
						const department = await findDepartmentByInitialize(
							req.body[field],
						);
						if (!department) {
							// eslint-disable-next-line no-await-in-loop
							throw new Error('plz enter valid department');
						} else {
							staff.department_init = department.initialize;
						}
					}
				} else {
					staff[field] = req.body[field];
				}
			}
			await staff.save();
			return res.status(200).send({ data: staff });
		} catch (err) {
			return next(err);
		}
	}

  /**
   * Deletes Staff
   * @param {Request} req => Express Request
   * @param {Response} res => Express Response
   * @param {NextFunction} next => Express next function
   */
	async deleteStaff(req, res, next) {
		try {
			// const { id } = req.id;
			const staff = await findStaffById (req.params.id);
			if (!staff) {
				return next(
					new HttpException(
						404,
						USER_ERROR_CODES.USER_ID_NOT_FOUND,
						'USER_NOT_FOUND',
						null,
					),
				);
			}
			await deleteStaffById(req.params.id);
			// const staffs = await findStaff ByDepartmentInit(req.department_init);
			// if (staffs.length === 0) {
			// 	const department = await findStaff ByDepartmentInit(req.department_id);
			// 	department.delete();
			// }
			return res.status(200).send({ data: staff });
		} catch (err) {
			return next(err);
		}
	}

  /**
   * Logs Out Staff
   * @param {Request} req => Express Request
   * @param {Response} res => Express Response
   * @param {NextFunction} next => Express next function
   */
	async logoutStaff(req, res, next) {
		try {
			// const { id } = req.id;
			// console.log(id);
			const staff = await findStaffById (req.params.id);
			if (!staff) {
				return next(
					new HttpException(
						404,
						USER_ERROR_CODES.USER_ID_NOT_FOUND,
						'STAFF_NOT_FOUND',
						null,
					),
				);
			}
			staff.authToken = undefined;
			await staff.save();
			return res.status(200).send({ data: staff });
		} catch (err) {
			return next(err);
		}
	}

  /**
   * Allows Staff to Login
   * @param {Request} req => Express Request
   * @param {Response} res => Express Response
   * @param {NextFunction} next => Express next function
   */
	async loginStaff(req, res, next) {
		try {
			const { phone_no, password } = req.body;
      if(!phone_no || !password) {
        return next(
          new HttpException(
            400,
            USER_ERROR_CODES.PHONE_NO_OR_PASSWORD_NOT_FOUND,
            'PHONE_NO_OR_PASSWORD_NOT_FOUND',
            null,
          ),
        );

      }
	
			const staff = await findStaffByPhoneNo(phone_no);
			
      if(staff) {
        const match = await bcrypt.compare(password, staff.password);
        if (match) {
          const privateKey = fs.readFileSync(
            join(__dirname, '../../../keys/Private.key'),
          );
          const token = jwt.sign(
            { id: staff.id, phone_no: staff.phone_no, department_id: staff.department_init },
            privateKey,
            { algorithm: 'RS256' },
          );
          staff.authToken = token;
          await staff.save();
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

export default StaffController;

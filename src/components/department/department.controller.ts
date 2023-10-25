import HttpException from '../../utils/error.utils';
import {
	findDepartmentById,
	findAllDepartments,
	CreateNewDepartment,
	findDepartmentByInitialize,
	deleteDepartmentById,
} from './department.DAL';
import DEPARTMENT_ERROR_CODES from './department.error';
// import Department from './department.model';

class DepartmentController {
	/**
	 * Create new Department
	 *  @param req => Express Request
	 * @param res => Express Response
	 * @param next => Express next function
	 */

	async createDepartment(req, res, next) {
		try {
			const department = await CreateNewDepartment(req.body);
			return res.status(200).send({ data: department });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * List Departments
	 * @param req => Express Request
	 * @param res => Express Response
	 * @param next => Express next function
	 */

	async getDepartments(req, res, next) {
		try {
			const departments = await findAllDepartments();
			return res.status(200).send({ data: departments });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 *Update Department
	 * @param req => Express Request
	 * @param res => Express Response
	 * @param next => Express next function
	 */

	async updateDepartment(req, res, next) {
		try {
			if (!req.params.department_id) {
				return next(
					new HttpException(
						400,
						DEPARTMENT_ERROR_CODES.DEPARTMENT_ID_NOT_FOUND,
						'DEPARTMENT Id not found',
						null,
					),
				);
			}

			const department = await findDepartmentById(
				req.params.department_id,
			);

			if (!department) {
				return next(
					new HttpException(
						404,
						DEPARTMENT_ERROR_CODES.DEPARTMENT_ID_NOT_FOUND,
						'DEPARTMENT  not found',
						null,
					),
				);
			}

			for (const field in req.body) {
				department[field] = req.body[field];
			}
			await department.save();
			res.status(200).send({ data: department });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Delete Department By Initialization
	 * @param req => Express Request
	 * @param res => Express Response
	 * @param next => Express next function
	 */

	async DeleteDept(req, res, next) {
		try {
			const department = await deleteDepartmentById(req.params.init);
			return res.status(200).send({ data: department });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * find dept by initialize
	 * @param req => Express Request
	 * @param res => Express Response
	 * @param next => Express next function
	 */

	async FindByInit(req, res, next) {
		try {
			const department = await findDepartmentByInitialize(
				req.params.init,
			);
			return res.status(200).send({ data: department });
		} catch (err) {
			return next(err);
		}
	}
}

export default DepartmentController;

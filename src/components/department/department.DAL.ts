import HttpException from '../../utils/error.utils';
import DEPARTMENT_ERROR_CODES from './department.error';
import Department from './department.model';

/**
 * Create new Department in DB
 * @param depBody => Department object to be created
 */

export async function CreateNewDepartment(depBody: any) {
	try {
		return await Department.create(depBody);
	} catch (err) {
		throw new HttpException(
			500,
			DEPARTMENT_ERROR_CODES.CREATE_DEPARTMENT_UNHANDLED_IN_DB,
			'CREATE_DEPARTMENT_UNHANDLED_IN_DB',
			err,
		);
	}
}

/**
 * Finds Department from DB
 * @param id => id of Department to be found
 */
export async function findDepartmentById(_id: any) {
	try {
		return await Department.findById({ _id });
	} catch (err) {
		throw new HttpException(
			500,
			DEPARTMENT_ERROR_CODES.DEPARTMENT_NOT_FOUND,
			'DEPARTMENT id not found',
			err,
		);
	}
}

/**
 * Finds Department from DB by Initialize
 * @param id => id of Department to be found
 */
export async function findDepartmentByInitialize(initialize: any) {
	try {
		return await Department.findOne({ initialize });
	} catch (err) {
		throw new HttpException(
			500,
			DEPARTMENT_ERROR_CODES.DEPARTMENT_NOT_FOUND,
			'DEPARTMENT id not found',
			err,
		);
	}
}

/**
 * Finds all Departments from DB
 */

export async function findAllDepartments() {
	try {
		return await Department.find().lean();
	} catch (err) {
		throw new HttpException(
			500,
			DEPARTMENT_ERROR_CODES.DEPARTMENTS_NOT_FOUND,
			'No DEPARTMENTs found',
			err,
		);
	}
}

/**
 * delete Department By initialize
 * @param initialize => initialize of department to be delete/remove
 */

export async function deleteDepartmentById(initialize) {
	try {
		console.log('here');
		return await Department.findOneAndDelete({ initialize });
	} catch (err) {
		throw new HttpException(
			500,
			DEPARTMENT_ERROR_CODES.DEPARTMENT_NOT_FOUND,
			'initialize not found',
			err,
		);
	}
}

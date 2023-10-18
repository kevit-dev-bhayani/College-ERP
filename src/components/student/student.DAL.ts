import HttpException from '../../utils/error.utils';
import USER_ERROR_CODES from '../../utils/user.error';
import Student from './student.model';

/**
 * Creates new Student in DB
 * @param userBody => Student Object to be created.
 */
export async function createNewStudent(userBody) {
	try {
		return await Student.create(userBody);
	} catch (err) {
		throw new HttpException(
			500,
			USER_ERROR_CODES.CREATE_USER_UNHANDLED_IN_DB,
			'CREATE_USER_UNHANDLED_IN_DB',
			err,
		);
	}
}

/**
 * Finds USER by _id from DB
 * @param _id => Student Object to be found.
 */
export async function findStudentById(_id) {
	try {
		console.log(_id);
		return await Student.findOne({ _id });
	} catch (err) {
		throw new HttpException(
			500,
			USER_ERROR_CODES.USER_ID_NOT_FOUND,
			'USER_NOT_FOUND',
			err,
		);
	}
}
/**
 * Finds Students by _id from DB
 * @param _id => Organization _id
 */
export async function findStudentsByDepartmentInit(initialize) {
	try {
		return await Student.find({ initialize });
	} catch (err) {
		throw new HttpException(
			500,
			USER_ERROR_CODES.USER_ID_NOT_FOUND,
			'USER_NOT_FOUND',
			err,
		);
	}
}

/**
 * Find Student by email from DB
 * @param email_id => Email of the user
 */
export async function findStudentByPhoneNo(phone_no) {
	try {
		return await Student.findOne({ phone_no });
	} catch (err) {
		throw new HttpException(
			500,
			USER_ERROR_CODES.USER_NOT_FOUND,
			'USER_NOT_FOUND',
			err,
		);
	}
}

/**
 * List Students from DB
 */
export async function findStudents() {
	try {
		return await Student.find().lean();
	} catch (err) {
		throw new HttpException(
			500,
			USER_ERROR_CODES.USER_NOT_FOUND,
			'USERS_NOT_FOUND',
			err,
		);
	}
}

export async function deleteStudentById(_id) {
	try {
		return await Student.findOneAndDelete({ _id });
	} catch (err) {
		throw new HttpException(
			500,
			USER_ERROR_CODES.USER_NOT_FOUND,
			'USERS_NOT_FOUND',
			err,
		);
	}
}
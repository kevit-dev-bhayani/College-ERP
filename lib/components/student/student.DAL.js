"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentById = exports.findStudents = exports.findStudentByPhoneNo = exports.findStudentsByDepartmentInit = exports.findStudentById = exports.createNewStudent = void 0;
const error_utils_1 = require("../../utils/error.utils");
const user_error_1 = require("../../utils/user.error");
const student_model_1 = require("./student.model");
async function createNewStudent(userBody) {
    try {
        return await student_model_1.default.create(userBody);
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.CREATE_USER_UNHANDLED_IN_DB, 'CREATE_USER_UNHANDLED_IN_DB', err);
    }
}
exports.createNewStudent = createNewStudent;
async function findStudentById(_id) {
    try {
        console.log(_id);
        return await student_model_1.default.findOne({ _id });
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.USER_ID_NOT_FOUND, 'USER_NOT_FOUND', err);
    }
}
exports.findStudentById = findStudentById;
async function findStudentsByDepartmentInit(initialize) {
    try {
        return await student_model_1.default.find({ initialize });
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.USER_ID_NOT_FOUND, 'USER_NOT_FOUND', err);
    }
}
exports.findStudentsByDepartmentInit = findStudentsByDepartmentInit;
async function findStudentByPhoneNo(phone_no) {
    try {
        return await student_model_1.default.findOne({ phone_no });
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.USER_NOT_FOUND, 'USER_NOT_FOUND', err);
    }
}
exports.findStudentByPhoneNo = findStudentByPhoneNo;
async function findStudents() {
    try {
        return await student_model_1.default.find().lean();
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.USER_NOT_FOUND, 'USERS_NOT_FOUND', err);
    }
}
exports.findStudents = findStudents;
async function deleteStudentById(_id) {
    try {
        return await student_model_1.default.findOneAndDelete({ _id });
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.USER_NOT_FOUND, 'USERS_NOT_FOUND', err);
    }
}
exports.deleteStudentById = deleteStudentById;
//# sourceMappingURL=student.DAL.js.map
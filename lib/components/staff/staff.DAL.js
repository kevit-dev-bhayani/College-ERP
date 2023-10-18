"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaffById = exports.findStaffs = exports.findStaffByPhoneNo = exports.findStaffByDepartmentInit = exports.findStaffById = exports.createNewStaff = void 0;
const error_utils_1 = require("../../utils/error.utils");
const user_error_1 = require("../../utils/user.error");
const staff_model_1 = require("./staff.model");
async function createNewStaff(userBody) {
    try {
        return await staff_model_1.default.create(userBody);
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.CREATE_USER_UNHANDLED_IN_DB, 'CREATE_USER_UNHANDLED_IN_DB', err);
    }
}
exports.createNewStaff = createNewStaff;
async function findStaffById(_id) {
    try {
        return await staff_model_1.default.findOne({ _id });
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.USER_ID_NOT_FOUND, 'USER_NOT_FOUND', err);
    }
}
exports.findStaffById = findStaffById;
async function findStaffByDepartmentInit(initialize) {
    try {
        return await staff_model_1.default.find({ initialize });
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.USER_ID_NOT_FOUND, 'USER_NOT_FOUND', err);
    }
}
exports.findStaffByDepartmentInit = findStaffByDepartmentInit;
async function findStaffByPhoneNo(phone_no) {
    try {
        return await staff_model_1.default.findOne({ phone_no: phone_no });
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.USER_NOT_FOUND, 'USER_NOT_FOUND', err);
    }
}
exports.findStaffByPhoneNo = findStaffByPhoneNo;
async function findStaffs() {
    try {
        return await staff_model_1.default.find().lean();
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.USER_NOT_FOUND, 'USERS_NOT_FOUND', err);
    }
}
exports.findStaffs = findStaffs;
async function deleteStaffById(_id) {
    try {
        return await staff_model_1.default.findOneAndDelete({ _id });
    }
    catch (err) {
        throw new error_utils_1.default(500, user_error_1.default.USER_NOT_FOUND, 'USERS_NOT_FOUND', err);
    }
}
exports.deleteStaffById = deleteStaffById;
//# sourceMappingURL=staff.DAL.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const error_utils_1 = require("../../utils/error.utils");
const user_error_1 = require("../../utils/user.error");
const department_DAL_1 = require("../department/department.DAL");
const staff_DAL_1 = require("./staff.DAL");
class StaffController {
    async createStaff(req, res, next) {
        try {
            const staffObject = req.body;
            const { department_init } = req.body;
            const department = await (0, department_DAL_1.findDepartmentByInitialize)(department_init);
            if (!department) {
                throw new Error('plz enter valid department_init');
            }
            else {
                staffObject.department_id = department._id;
            }
            const staff = await (0, staff_DAL_1.createNewStaff)(staffObject);
            return res.status(200).send({ data: staff });
        }
        catch (err) {
            return next(err);
        }
    }
    async getStaff(req, res, next) {
        try {
            const staffs = await (0, staff_DAL_1.findStaffs)();
            return res.status(200).send({ data: staffs });
        }
        catch (err) {
            return next(err);
        }
    }
    async findStaff(req, res, next) {
        try {
            const staff = await (0, staff_DAL_1.findStaffById)(req.id);
            if (staff) {
                return res.status(200).send({ data: staff });
            }
            throw new Error('Id not found');
        }
        catch (err) {
            return next(err);
        }
    }
    async updateStaff(req, res, next) {
        try {
            const staff = await (0, staff_DAL_1.findStaffById)(req.id);
            if (!staff) {
                return next(new error_utils_1.default(404, user_error_1.default.USER_ID_NOT_FOUND, 'Staff_NOT_FOUND', null));
            }
            for (const field in req.body) {
                if (field === 'department_init') {
                    const staffDept = await (0, department_DAL_1.findDepartmentByInitialize)(staff.department_init);
                    if (staffDept.initialize !== req.body[field]) {
                        const department = await (0, department_DAL_1.findDepartmentByInitialize)(req.body[field]);
                        if (!department) {
                            throw new Error('plz enter valid department');
                        }
                        else {
                            staff.department_init = department.initialize;
                        }
                    }
                }
                else {
                    staff[field] = req.body[field];
                }
            }
            await staff.save();
            return res.status(200).send({ data: staff });
        }
        catch (err) {
            return next(err);
        }
    }
    async deleteStaff(req, res, next) {
        try {
            const staff = await (0, staff_DAL_1.findStaffById)(req.id);
            if (!staff) {
                return next(new error_utils_1.default(404, user_error_1.default.USER_ID_NOT_FOUND, 'USER_NOT_FOUND', null));
            }
            await (0, staff_DAL_1.deleteStaffById)(req.id);
            return res.status(200).send({ data: staff });
        }
        catch (err) {
            return next(err);
        }
    }
    async logoutStaff(req, res, next) {
        try {
            const staff = await (0, staff_DAL_1.findStaffById)(req.id);
            if (!staff) {
                return next(new error_utils_1.default(404, user_error_1.default.USER_ID_NOT_FOUND, 'STAFF_NOT_FOUND', null));
            }
            staff.authToken = undefined;
            await staff.save();
            return res.status(200).send({ data: staff });
        }
        catch (err) {
            return next(err);
        }
    }
    async loginStaff(req, res, next) {
        try {
            const { phone_no, password } = req.body;
            if (!phone_no || !password) {
                return next(new error_utils_1.default(400, user_error_1.default.PHONE_NO_OR_PASSWORD_NOT_FOUND, 'PHONE_NO_OR_PASSWORD_NOT_FOUND', null));
            }
            const staff = await (0, staff_DAL_1.findStaffByPhoneNo)(phone_no);
            if (staff) {
                const match = await bcrypt.compare(password, staff.password);
                if (match) {
                    const privateKey = fs.readFileSync((0, path_1.join)(__dirname, '../../../keys/Private.key'));
                    const token = await jwt.sign({ id: staff.id, phone_no: staff.phone_no, department_id: staff.department_init }, privateKey, { algorithm: 'RS256' });
                    staff.authToken = token;
                    await staff.save();
                    return res.status(200).send({ authToken: token });
                }
                return next(new error_utils_1.default(401, user_error_1.default.UNAUTHENTICATED, 'UNAUTHENTICATED', null));
            }
            return next(new error_utils_1.default(401, user_error_1.default.USER_NOT_FOUND, 'STUDENT_NOT_FOUND', null));
        }
        catch (err) {
            return next(err);
        }
    }
}
exports.default = StaffController;
//# sourceMappingURL=staff.controller.js.map
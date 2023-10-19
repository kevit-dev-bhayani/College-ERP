"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const jwt = require("jsonwebtoken");
const student_DAL_1 = require("../components/student/student.DAL");
const staff_DAL_1 = require("../components/staff/staff.DAL");
const error_utils_1 = require("./error.utils");
const user_error_1 = require("./user.error");
exports.default = async (req, res, next) => {
    const authToken = req.header('Authorization').replace('Bearer ', '');
    if (!authToken) {
        return next(new error_utils_1.default(401, user_error_1.default.UNAUTHENTICATED, 'UNAUTHENTICATED', null));
    }
    const privateKey = fs.readFileSync((0, path_1.join)(__dirname, '../../keys/Private.key'));
    try {
        const { id, phone_no, role, department } = jwt.verify(authToken, privateKey);
        const user = role === 'student' ? await (0, student_DAL_1.findStudentById)(id) : await (0, staff_DAL_1.findStaffById)(id);
        if (user.authToken !== authToken) {
            return next(new error_utils_1.default(401, user_error_1.default.UNAUTHENTICATED, 'UNAUTHENTICATED', null));
        }
        req.id = id;
        req.role = role;
        req.phone_no = phone_no;
        req.department = department;
        next();
    }
    catch (error) {
        return next(new error_utils_1.default(401, user_error_1.default.UNAUTHENTICATED, 'UNAUTHENTICATED', null));
    }
};
//# sourceMappingURL=auth.js.map
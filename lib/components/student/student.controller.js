"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const error_utils_1 = require("../../utils/error.utils");
const user_error_1 = require("../../utils/user.error");
const department_DAL_1 = require("../department/department.DAL");
const student_DAL_1 = require("./student.DAL");
class StudentsController {
    async createStudents(req, res, next) {
        try {
            const studentObject = req.body;
            const { department_init } = req.body;
            const department = await (0, department_DAL_1.findDepartmentByInitialize)(department_init);
            if (!department) {
                throw new Error('plz enter valid department_init');
            }
            else {
                studentObject.department_id = department._id;
            }
            const student = await (0, student_DAL_1.createNewStudent)(studentObject);
            return res.status(201).send({ data: student });
        }
        catch (err) {
            return next(err);
        }
    }
    async getStudents(req, res, next) {
        try {
            const students = await (0, student_DAL_1.findStudents)();
            return res.status(200).send({ data: students });
        }
        catch (err) {
            return next(err);
        }
    }
    async findStudent(req, res, next) {
        try {
            const student = await (0, student_DAL_1.findStudentById)(req.id);
            if (student) {
                return res.status(200).send({ data: student });
            }
            throw new Error('Id not found');
        }
        catch (err) {
            return next(err);
        }
    }
    async updateStudent(req, res, next) {
        try {
            const student = await (0, student_DAL_1.findStudentById)(req.id);
            if (!student) {
                return next(new error_utils_1.default(404, user_error_1.default.USER_ID_NOT_FOUND, 'STUDENT_NOT_FOUND', null));
            }
            for (const field in req.body) {
                if (field === 'department_init') {
                    const studentDept = await (0, department_DAL_1.findDepartmentByInitialize)(student.department_init);
                    if (studentDept.initialize !== req.body[field]) {
                        const department = await (0, department_DAL_1.findDepartmentByInitialize)(req.body[field]);
                        if (!department) {
                            throw new Error('plz enter valid department');
                        }
                        else {
                            student.department_init = department.initialize;
                        }
                    }
                }
                else {
                    student[field] = req.body[field];
                }
            }
            await student.save();
            return res.status(200).send({ data: student });
        }
        catch (err) {
            return next(err);
        }
    }
    async deleteStudent(req, res, next) {
        try {
            const student = await (0, student_DAL_1.findStudentById)(req.id);
            if (!student) {
                return next(new error_utils_1.default(404, user_error_1.default.USER_ID_NOT_FOUND, 'USER_NOT_FOUND', null));
            }
            await (0, student_DAL_1.deleteStudentById)(req.id);
            return res.status(200).send({ data: student });
        }
        catch (err) {
            return next(err);
        }
    }
    async logoutStudent(req, res, next) {
        try {
            const student = await (0, student_DAL_1.findStudentById)(req.id);
            if (!student) {
                return next(new error_utils_1.default(404, user_error_1.default.USER_ID_NOT_FOUND, 'STUDENT_NOT_FOUND', null));
            }
            student.authToken = undefined;
            await student.save();
            return res.status(200).send({ data: student });
        }
        catch (err) {
            return next(err);
        }
    }
    async loginStudent(req, res, next) {
        try {
            const { phone_no, password } = req.body;
            if (!phone_no || !password) {
                return next(new error_utils_1.default(400, user_error_1.default.PHONE_NO_OR_PASSWORD_NOT_FOUND, 'PHONE_NO_OR_PASSWORD_NOT_FOUND', null));
            }
            const student = await (0, student_DAL_1.findStudentByPhoneNo)(phone_no);
            if (student) {
                const match = await bcrypt.compare(password, student.password);
                if (match) {
                    const privateKey = fs.readFileSync((0, path_1.join)(__dirname, '../../../keys/Private.key'));
                    const token = await jwt.sign({ id: student.id, phone_no: student.phone_no, department_id: student.department_init, role: student.role }, privateKey, { algorithm: 'RS256' });
                    student.authToken = token;
                    await student.save();
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
exports.default = StudentsController;
//# sourceMappingURL=student.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_utils_1 = require("../../utils/error.utils");
const department_DAL_1 = require("./department.DAL");
const department_error_1 = require("./department.error");
class DepartmentController {
    async createDepartment(req, res, next) {
        try {
            const department = await (0, department_DAL_1.CreateNewDepartment)(req.body);
            return res.status(200).send({ data: department });
        }
        catch (err) {
            return next(err);
        }
    }
    async getDepartments(req, res, next) {
        try {
            const departments = await (0, department_DAL_1.findAllDepartments)();
            return res.status(200).send({ data: departments });
        }
        catch (err) {
            return next(err);
        }
    }
    async updateDepartment(req, res, next) {
        try {
            if (!req.params.department_id) {
                return next(new error_utils_1.default(400, department_error_1.default.DEPARTMENT_ID_NOT_FOUND, 'DEPARTMENT Id not found', null));
            }
            const department = await (0, department_DAL_1.findDepartmentById)(req.params.department_id);
            if (!department) {
                return next(new error_utils_1.default(404, department_error_1.default.DEPARTMENT_ID_NOT_FOUND, 'DEPARTMENT  not found', null));
            }
            for (const field in req.body) {
                department[field] = req.body[field];
            }
            await department.save();
            res.status(200).send({ data: department });
        }
        catch (err) {
            return next(err);
        }
    }
    async DeleteDept(req, res, next) {
        try {
            const department = await (0, department_DAL_1.deleteDepartmentById)(req.params.init);
            return res.status(200).send({ data: department });
        }
        catch (err) {
            return next(err);
        }
    }
    async FindByInit(req, res, next) {
        try {
            const department = await (0, department_DAL_1.findDepartmentByInitialize)(req.params.init);
            return res.status(200).send({ data: department });
        }
        catch (err) {
            return next(err);
        }
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.controller.js.map
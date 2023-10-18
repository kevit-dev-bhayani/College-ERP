"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartmentById = exports.findAllDepartments = exports.findDepartmentByInitialize = exports.findDepartmentById = exports.CreateNewDepartment = void 0;
const error_utils_1 = require("../../utils/error.utils");
const department_error_1 = require("./department.error");
const department_model_1 = require("./department.model");
async function CreateNewDepartment(depBody) {
    try {
        return await department_model_1.default.create(depBody);
    }
    catch (err) {
        throw new error_utils_1.default(500, department_error_1.default.CREATE_DEPARTMENT_UNHANDLED_IN_DB, 'CREATE_DEPARTMENT_UNHANDLED_IN_DB', err);
    }
}
exports.CreateNewDepartment = CreateNewDepartment;
async function findDepartmentById(_id) {
    try {
        return await department_model_1.default.findById({ _id });
    }
    catch (err) {
        throw new error_utils_1.default(500, department_error_1.default.DEPARTMENT_NOT_FOUND, 'DEPARTMENT id not found', err);
    }
}
exports.findDepartmentById = findDepartmentById;
async function findDepartmentByInitialize(initialize) {
    try {
        return await department_model_1.default.findOne({ initialize });
    }
    catch (err) {
        throw new error_utils_1.default(500, department_error_1.default.DEPARTMENT_NOT_FOUND, 'DEPARTMENT id not found', err);
    }
}
exports.findDepartmentByInitialize = findDepartmentByInitialize;
async function findAllDepartments() {
    try {
        return await department_model_1.default.find().lean();
    }
    catch (err) {
        throw new error_utils_1.default(500, department_error_1.default.DEPARTMENTS_NOT_FOUND, 'No DEPARTMENTs found', err);
    }
}
exports.findAllDepartments = findAllDepartments;
async function deleteDepartmentById(initialize) {
    try {
        console.log('here');
        return await department_model_1.default.findOneAndDelete({ initialize });
    }
    catch (err) {
        throw new error_utils_1.default(500, department_error_1.default.DEPARTMENT_NOT_FOUND, 'initialize not found', err);
    }
}
exports.deleteDepartmentById = deleteDepartmentById;
//# sourceMappingURL=department.DAL.js.map
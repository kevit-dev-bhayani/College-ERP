"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = require("./department.controller");
class DepartmentRoutes {
    constructor() {
        this.deptController = new department_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', this.deptController.getDepartments);
        this.router.patch('/update/:department_id', this.deptController.updateDepartment);
        this.router.post('/create', this.deptController.createDepartment);
        this.router.get('/:init', this.deptController.FindByInit);
        this.router.delete('/delete/:init', this.deptController.DeleteDept);
    }
}
exports.default = new DepartmentRoutes().router;
//# sourceMappingURL=department.routes.js.map
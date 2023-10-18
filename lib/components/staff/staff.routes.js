"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staff_controller_1 = require("./staff.controller");
class StaffRoute {
    constructor() {
        this.staffController = new staff_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/signup', this.staffController.createStaff);
        this.router.get('/', this.staffController.getStaff);
        this.router.get('/:id', this.staffController.findStaff);
        this.router.patch('/update/:id', this.staffController.updateStaff);
        this.router.delete('/delete/:id', this.staffController.deleteStaff);
        this.router.post('/login', this.staffController.loginStaff);
        this.router.put('/logout/:id', this.staffController.logoutStaff);
    }
}
exports.default = new StaffRoute().router;
//# sourceMappingURL=staff.routes.js.map
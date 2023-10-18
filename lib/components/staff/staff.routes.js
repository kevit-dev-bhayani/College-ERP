"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../utils/auth");
const staff_controller_1 = require("./staff.controller");
class StaffRoute {
    constructor() {
        this.staffController = new staff_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/signup', this.staffController.createStaff);
        this.router.get('/', auth_1.default, this.staffController.getStaff);
        this.router.get('/me', auth_1.default, this.staffController.findStaff);
        this.router.patch('/update/me', auth_1.default, this.staffController.updateStaff);
        this.router.delete('/delete/me', auth_1.default, this.staffController.deleteStaff);
        this.router.post('/login', this.staffController.loginStaff);
        this.router.put('/logout/me', auth_1.default, this.staffController.logoutStaff);
    }
}
exports.default = new StaffRoute().router;
//# sourceMappingURL=staff.routes.js.map
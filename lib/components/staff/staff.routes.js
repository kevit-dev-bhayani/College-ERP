"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../utils/auth");
const authorization_1 = require("../../utils/authorization");
const staff_controller_1 = require("./staff.controller");
class StaffRoute {
    constructor() {
        this.staffController = new staff_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/signup', auth_1.default, (0, authorization_1.default)(['admin']), this.staffController.createStaff);
        this.router.get('/', auth_1.default, (0, authorization_1.default)(['admin']), this.staffController.getStaff);
        this.router.get('/me', auth_1.default, (0, authorization_1.default)(['admin', 'staff']), this.staffController.findStaff);
        this.router.patch('/update/me', (0, authorization_1.default)(['admin']), auth_1.default, this.staffController.updateStaff);
        this.router.delete('/delete/me', (0, authorization_1.default)(['admin']), auth_1.default, this.staffController.deleteStaff);
        this.router.post('/login', this.staffController.loginStaff);
        this.router.put('/logout/me', auth_1.default, this.staffController.logoutStaff);
    }
}
exports.default = new StaffRoute().router;
//# sourceMappingURL=staff.routes.js.map
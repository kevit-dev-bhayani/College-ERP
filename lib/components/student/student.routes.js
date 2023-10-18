"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../utils/auth");
const student_controller_1 = require("./student.controller");
class StudentRoute {
    constructor() {
        this.studentController = new student_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/signup', this.studentController.createStudents);
        this.router.get('/', auth_1.default, this.studentController.getStudents);
        this.router.get('/me', auth_1.default, this.studentController.findStudent);
        this.router.patch('/update/me', auth_1.default, this.studentController.updateStudent);
        this.router.delete('/delete/me', auth_1.default, this.studentController.deleteStudent);
        this.router.post('/login', this.studentController.loginStudent);
        this.router.put('/logout/me', auth_1.default, this.studentController.logoutStudent);
    }
}
exports.default = new StudentRoute().router;
//# sourceMappingURL=student.routes.js.map
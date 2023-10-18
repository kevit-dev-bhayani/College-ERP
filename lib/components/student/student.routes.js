"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
class StudentRoute {
    constructor() {
        this.studentController = new student_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/signup', this.studentController.createStudents);
        this.router.get('/', this.studentController.getStudents);
        this.router.get('/:id', this.studentController.findStudent);
        this.router.patch('/update/:id', this.studentController.updateStudent);
        this.router.delete('/delete/:id', this.studentController.deleteStudent);
        this.router.post('/login', this.studentController.loginStudent);
        this.router.put('/logout/:id', this.studentController.logoutStudent);
    }
}
exports.default = new StudentRoute().router;
//# sourceMappingURL=student.routes.js.map
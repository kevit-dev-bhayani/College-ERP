"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const department_routes_1 = require("./components/department/department.routes");
const staff_routes_1 = require("./components/staff/staff.routes");
const student_routes_1 = require("./components/student/student.routes");
const index_1 = require("./index");
class ApplicationConfig {
    static registerRoute(app) {
        app.use('/', index_1.default);
        app.use('/dept', department_routes_1.default);
        app.use('/student', student_routes_1.default);
        app.use('/staff', staff_routes_1.default);
    }
}
exports.default = ApplicationConfig;
//# sourceMappingURL=application.routes.js.map
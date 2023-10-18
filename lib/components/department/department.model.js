"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Schema, model } = mongoose_1.default;
const departmentSchema = new Schema({
    department: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    initialize: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    }
});
const Department = model('Department', departmentSchema);
exports.default = Department;
//# sourceMappingURL=department.model.js.map
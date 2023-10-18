"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const jwt = require("jsonwebtoken");
const error_utils_1 = require("./error.utils");
const user_error_1 = require("./user.error");
exports.default = async (req, res, next) => {
    const authToken = req.header('Authorization').replace('Bearer ', '');
    console.log(authToken, "ppppppppppppppppppppppppppppppppppppppppppp");
    if (!authToken) {
        return next(new error_utils_1.default(401, user_error_1.default.UNAUTHENTICATED, 'UNAUTHENTICATED', null));
    }
    const privateKey = fs.readFileSync((0, path_1.join)(__dirname, '../../keys/Private.key'));
    try {
        const { id, phone_no, role, department } = jwt.verify(authToken, privateKey);
        console.log(id, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        const user = await ({ id });
        console.log(user, "ooooooooooooooooooooooooooooooooooo");
        if (user.authToken !== authToken) {
            console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
            return next(new error_utils_1.default(401, user_error_1.default.UNAUTHENTICATED, 'UNAUTHENTICATED', null));
        }
        req.user.id = id;
        req.user.role = role;
        req.user.phone_no = phone_no;
        req.user.department = department;
        next();
    }
    catch (error) {
        return next(new error_utils_1.default(401, user_error_1.default.UNAUTHENTICATED, 'UNAUTHENTICATED', null));
    }
};
//# sourceMappingURL=auth.js.map
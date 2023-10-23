"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorize = (role) => {
    return (req, res, next) => {
        console.log(req.role);
        if (role.includes(req.role)) {
            res.status(403).send('Forbidden');
            return;
        }
        next();
    };
};
exports.default = authorize;
//# sourceMappingURL=authorization.js.map
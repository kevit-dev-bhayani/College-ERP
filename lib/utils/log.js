"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_channel_logger_1 = require("@kevit/winston-channel-logger");
const winston_1 = require("winston");
const winstonChannelLogger = new winston_channel_logger_1.WinstonChannelLogger({
    level: 'silly',
    platforms: [],
});
exports.logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({ level: 'silly' }),
        winstonChannelLogger,
    ],
});
//# sourceMappingURL=log.js.map
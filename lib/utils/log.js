"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_channel_logger_1 = require("@kevit/winston-channel-logger");
const winston_1 = require("winston");
const winstonChannelLogger = new winston_channel_logger_1.WinstonChannelLogger({
    level: 'silly',
    platforms: [
        {
            platformName: 'discord',
            webhookUrl: 'https://discord.com/api/webhooks/1163453342014505061/2-sz0JkuIb9TR3fiJO_rLMRaQinDsFVu2751qk732Q1RdeRB-G4RHFB2mQ7LBjsIXuig',
        },
    ],
});
exports.logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({ level: 'silly' }),
        winstonChannelLogger,
    ],
});
//# sourceMappingURL=log.js.map
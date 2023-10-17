"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const log_1 = require("./utils/log");
const mongoUrl = config_1.default.mongodb.url;
const PORT = config_1.default.server.port;
class App {
    constructor() {
        this.app = express();
        this.app.listen(PORT, () => {
            log_1.logger.info('Server is running on port', PORT);
        });
        this.mongoSetup();
    }
    mongoSetup() {
        mongoose_1.default.connection.on('connected', () => {
            log_1.logger.info('DATABASE-CONNECTED');
        });
        mongoose_1.default.connection.on('error', (err) => {
            log_1.logger.error(`DATABASE - Error:${err}`);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            log_1.logger.warn('DATABASE - disconnected  Retrying....');
        });
        const dbOptions = {
            maxPoolSize: 5,
            useNewUrlParser: true,
        };
        mongoose_1.default.connect(mongoUrl, dbOptions);
    }
}
new App();
//# sourceMappingURL=app.js.map
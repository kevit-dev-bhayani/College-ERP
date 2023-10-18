"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose_1 = require("mongoose");
const application_routes_1 = require("./application.routes");
const config_1 = require("./config");
const log_1 = require("./utils/log");
const mongoUrl = config_1.default.mongodb.url;
const PORT = config_1.default.server.port;
class App {
    constructor() {
        this.app = express();
        this.app.listen(PORT, () => {
            log_1.logger.info('Server is running on port ' + PORT);
        });
        this.config();
        this.mongoSetup();
    }
    config() {
        this.app.use(cors({
            origin: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Origin', ' Content-Type', ' Authorization'],
            credentials: true,
        }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 50000,
        }));
        application_routes_1.default.registerRoute(this.app);
        this.app.use(express.static('public'));
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
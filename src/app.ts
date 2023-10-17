// import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import mongoose from 'mongoose';

import ApplicationConfig from './application.routes';
import Config from './config';
import { logger } from './utils/log';

const mongoUrl: string = Config.mongodb.url;
const PORT: string | number = Config.server.port;
class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		// const server = http.createServer(this.app);
		this.app.listen(PORT, () => {
			logger.info('Server is running on port', PORT);
		});
		// this.config();
		this.mongoSetup();
	}

	private config(): void {
		this.app.use(
			cors({
				origin: true,
				methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
				allowedHeaders: ['Origin', ' Content-Type', ' Authorization'],
				credentials: true,
			}),
		);
		this.app.use(bodyParser.json());
		this.app.use(
			bodyParser.urlencoded({
				limit: '50mb',
				extended: true,
				parameterLimit: 50000,
			}),
		);

		// Register Routers.
		ApplicationConfig.registerRoute(this.app);
		this.app.use(express.static('public'));
	}

	private mongoSetup(): void {
		mongoose.connection.on('connected', () => {
			logger.info('DATABASE-CONNECTED');
		});

		mongoose.connection.on('error', (err) => {
			logger.error(`DATABASE - Error:${err}`);
		});

		mongoose.connection.on('disconnected', () => {
			logger.warn('DATABASE - disconnected  Retrying....');
		});

		const dbOptions = {
			maxPoolSize: 5,
			useNewUrlParser: true,
		};

		mongoose.connect(mongoUrl, dbOptions);
	}
}

new App();

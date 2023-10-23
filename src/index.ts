import { Router } from 'express';
import { logger } from './utils/log';

class IndexRoute {
	public router: Router;

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		logger.info('app started running');
		this.router.get('/', (req, res) => {
			res.status(200).send(' App is running...');
		});
	}
}

export default new IndexRoute().router;

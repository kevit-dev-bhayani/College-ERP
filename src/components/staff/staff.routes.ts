import { Router } from 'express';
import authentication from '../../utils/auth';
import authorize from '../../utils/authorization';
import StaffController from './staff.controller';

class StaffRoute {
	public router: Router;

	staffController = new StaffController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		// Sign Up
		this.router.post('/signup',authentication,authorize(['admin']), this.staffController.createStaff);

		// List Users
		this.router.get('/', authentication,authorize(['admin']),this.staffController.getStaff);
        
        //get self only
		this.router.get('/me',authentication, authorize(['admin','staff']),this.staffController.findStaff);


		// Update User
		this.router.patch(
			'/update/me',
			authorize(['admin']),
			authentication,
			this.staffController.updateStaff,
		);

		// Delete User
		this.router.delete(
			'/delete/me',
			authorize(['admin']),
			authentication,
			this.staffController.deleteStaff,
		);

		// Login User
		this.router.post('/login', this.staffController.loginStaff);

		// Logout User
		this.router.put(
			'/logout/me',
			authentication,
			this.staffController.logoutStaff,
		);
	}
}

export default new StaffRoute().router;

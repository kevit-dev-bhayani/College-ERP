import { Router } from 'express';
import authorization from '../../utils/auth';
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
		this.router.post('/signup', this.staffController.createStaff);

		// List Users
		this.router.get('/', authorization,this.staffController.getStaff);
        
        //find User By Id
		this.router.get('/me',authorization, this.staffController.findStaff);


		// Update User
		this.router.patch(
			'/update/me',
			authorization,
			this.staffController.updateStaff,
		);

		// Delete User
		this.router.delete(
			'/delete/me',
			authorization,
			this.staffController.deleteStaff,
		);

		// Login User
		this.router.post('/login', this.staffController.loginStaff);

		// Logout User
		this.router.put(
			'/logout/me',
			authorization,
			this.staffController.logoutStaff,
		);
	}
}

export default new StaffRoute().router;

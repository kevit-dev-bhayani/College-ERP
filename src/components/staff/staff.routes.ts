import { Router } from 'express';
// import authorization from '../../utils/auth';
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
		this.router.get('/', this.staffController.getStaff);
        
        //find User By Id
		this.router.get('/:id', this.staffController.findStaff);

		// Update User
		this.router.patch(
			'/update/:id',
			// authorization,
			this.staffController.updateStaff,
		);

		// Delete User
		this.router.delete(
			'/delete/:id',
			// authorization,
			this.staffController.deleteStaff,
		);

		// Login User
		this.router.post('/login', this.staffController.loginStaff);

		// Logout User
		this.router.put(
			'/logout/:id',
			// authorization,
			this.staffController.logoutStaff,
		);
	}
}

export default new StaffRoute().router;

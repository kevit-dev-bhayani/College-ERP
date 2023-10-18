import { Router } from 'express';
import authorization from '../../utils/auth';
import StudentController from './student.controller';

class StudentRoute {
	public router: Router;

	studentController = new StudentController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		// Sign Up
		this.router.post('/signup', this.studentController.createStudents);

		// List Users
		this.router.get('/',authorization, this.studentController.getStudents);
        
		this.router.get('/me',authorization, this.studentController.findStudent);

		// Update User
		this.router.patch(
			'/update/me',
			authorization,
			this.studentController.updateStudent,
		);

		// Delete User
		this.router.delete(
			'/delete/me',
			authorization,
			this.studentController.deleteStudent,
		);

		// Login User
		this.router.post('/login', this.studentController.loginStudent);

		// Logout User
		this.router.put(
			'/logout/me',
			authorization,
			this.studentController.logoutStudent,
		);
	}
}

export default new StudentRoute().router;

import { Router } from 'express';
import authentication from '../../utils/auth';
import authorize from '../../utils/authorization';
import StudentController from './student.controller';

//authentication;

class StudentRoute {
	public router: Router;

	studentController = new StudentController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		// Sign Up
		this.router.post('/signup',authentication,authorize(['admin','staff']) ,this.studentController.createStudents);

		// List Users
		this.router.get('/',authentication, authorize(['admin','staff']), this.studentController.getStudents);
        
		this.router.get('/me',authentication, this.studentController.findStudent);

		// Update User
		this.router.patch(
			'/update/me',
			authentication,
			authorize(['admin','staff']),
			this.studentController.updateStudent,
		);

		// Delete User
		this.router.delete(
			'/delete/me',
			authentication,
			authorize(['admin','staff']),
			this.studentController.deleteStudent,
		);

		// Login User
		this.router.post('/login', this.studentController.loginStudent);

		// Logout User
		this.router.put(
			'/logout/me',
			authentication,
			this.studentController.logoutStudent,
		);
	}
}

export default new StudentRoute().router;

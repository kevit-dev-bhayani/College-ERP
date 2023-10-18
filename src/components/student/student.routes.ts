import { Router } from 'express';
// import authorization from '../../utils/auth';
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
		this.router.get('/', this.studentController.getStudents);
        
        //find User By Id
		this.router.get('/:id', this.studentController.findStudent);

		// Update User
		this.router.patch(
			'/update/:id',
			// authorization,
			this.studentController.updateStudent,
		);

		// Delete User
		this.router.delete(
			'/delete/:id',
			// authorization,
			this.studentController.deleteStudent,
		);

		// Login User
		this.router.post('/login', this.studentController.loginStudent);

		// Logout User
		this.router.put(
			'/logout/:id',
			// authorization,
			this.studentController.logoutStudent,
		);
	}
}

export default new StudentRoute().router;

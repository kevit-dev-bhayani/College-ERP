import { Application } from 'express';
import departmentRoutes from './components/department/department.routes';
import StaffRoutes from './components/staff/staff.routes';
import studentRoutes from './components/student/student.routes';
// import UsersRoute from './components/users/user.routes';
import IndexRoute from './index';

export default class ApplicationConfig {
	public static registerRoute(app: Application) {
		app.use('/', IndexRoute);
		app.use('/dept', departmentRoutes);
		app.use('/student', studentRoutes);
		app.use('/staff', StaffRoutes);
		// app.use('/user',UsersRoute);
	}
}

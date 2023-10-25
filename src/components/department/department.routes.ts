import { Router } from 'express';
import authentication from '../../utils/auth';
import authorize from '../../utils/authorization';
import DepartmentController from './department.controller';

class DepartmentRoutes{
    public router:Router;

    deptController=new DepartmentController();

    constructor(){
        this.router=Router();
        this.initializeRoutes();
    }

    initializeRoutes() {

        this.router.get(
            '/',
            this.deptController.getDepartments,
        );

        this.router.patch(
            '/update/:department_id',
            authentication,
            authorize(['admin']),
            this.deptController.updateDepartment,
        );

        this.router.post(
            '/create',
            authentication,
            authorize(['admin']),
            this.deptController.createDepartment,
        );

        this.router.get(
            '/:init',
            this.deptController.FindByInit,
        );

        this.router.delete(
            '/delete/:init',
            authentication,
            authorize(['admin']),
            this.deptController.DeleteDept,
        );
    }
}

export default new DepartmentRoutes().router;
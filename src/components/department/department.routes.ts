import { Router } from 'express';
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
            this.deptController.updateDepartment,
        );

        this.router.post(
            '/create',
            this.deptController.createDepartment,
        );

        this.router.get(
            '/:init',
            this.deptController.FindByInit,
        );

        this.router.delete(
            '/delete/:init',
            this.deptController.DeleteDept,
        );
    }
}

export default new DepartmentRoutes().router;
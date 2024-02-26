import { Router } from 'express';
import { userController } from '../controllers/user_Controller';
/**
 * Middlewares
 */
import verifyToken from "../middlewares/validate_token";
import validateAdmin from '../middlewares/validate_admin';

class UserRoute {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/sign_up', verifyToken, validateAdmin, userController.signUp);
    }

}

const userRoute = new UserRoute();
export default userRoute.router;
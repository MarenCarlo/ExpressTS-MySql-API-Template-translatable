import { Router } from 'express';
import { authController } from '../controllers/auth_Controller';
/**
 * Middlewares
 */
import verifyToken from "../middlewares/validate_token";
import validateAdmin from '../middlewares/validate_admin';

class AuthRoute {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', authController.logIn);
        this.router.post('/get_temporal_token', verifyToken, validateAdmin, authController.get_temporal_token);
    }

}

const authRoute = new AuthRoute();
export default authRoute.router;
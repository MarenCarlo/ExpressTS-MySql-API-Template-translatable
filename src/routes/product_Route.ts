import { Router } from 'express';
import { productController } from '../controllers/product_Controller';
import verifyToken from "../middlewares/validate_token";

class DefaultRoute {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/products_list', verifyToken, productController.getProductsList);
    }

}

const defaultRoute = new DefaultRoute();
export default defaultRoute.router;
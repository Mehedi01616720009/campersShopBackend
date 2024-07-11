import { Router } from 'express';
import { ProductRoutes } from '../modules/product/product.router';
import { OrderRoutes } from '../modules/order/order.router';
import { CategoryRoutes } from '../modules/category/category.router';

// route initialization
const router = Router();

// routes data
const routes = [
    {
        path: '/products',
        route: ProductRoutes,
    },
    {
        path: '/orders',
        route: OrderRoutes,
    },
    {
        path: '/categories',
        route: CategoryRoutes,
    },
];

// routes execution
routes.forEach(route => router.use(route.path, route.route));

export default router;

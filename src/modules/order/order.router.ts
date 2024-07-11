import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { OrderControllers } from './order.controller';

const router = express.Router();

// create order route
router.post(
    '/',
    validateRequest(OrderValidations.createOrderValidationSchema),
    OrderControllers.createOrder,
);

// get all orders route
router.get('/', OrderControllers.getAllOrders);

// get single order route
router.get('/:id', OrderControllers.getSingleOrder);

export const OrderRoutes = router;

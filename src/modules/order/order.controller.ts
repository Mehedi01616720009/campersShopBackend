import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

// create order controller
const createOrder = catchAsync(async (req, res) => {
    const result = await OrderServices.createOrderIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Order created successfully',
        data: result,
    });
});

// get all orders controller
const getAllOrders = catchAsync(async (req, res) => {
    const result = await OrderServices.getAllOrdersFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Orders retrieved successfully',
        data: result,
    });
});

// get single order controller
const getSingleOrder = catchAsync(async (req, res) => {
    const result = await OrderServices.getSingleOrderFromDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order retrieved in successfully',
        data: result,
    });
});

export const OrderControllers = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};

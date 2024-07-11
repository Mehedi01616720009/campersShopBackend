import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

// create product controller
const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProductIntoDB(
        req.file,
        req.body,
    );
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Product created successfully',
        data: result,
    });
});

// get all products controller
const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProductsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Products retrieved successfully',
        data: result,
    });
});

// get single product controller
const getSingleProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.getSingleProductFromDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product retrieved successfully',
        data: result,
    });
});

// update single product controller
const updateSingleProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.updateSingleProductIntoDB(
        req.params.id,
        req.file,
        req.body,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product updated successfully',
        data: result,
    });
});

// delete single product controller
const deleteSingleProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.deleteSingleProductFromDB(
        req.params.id,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product deleted successfully',
        data: result,
    });
});

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};

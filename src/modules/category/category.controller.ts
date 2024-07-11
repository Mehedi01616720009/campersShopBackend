import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

// create category controller
const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.createCategoryIntoDB(
        req.file,
        req.body,
    );
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Category created successfully',
        data: result,
    });
});

// get all categories controller
const getAllCategorys = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategoriesFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categories retrieved successfully',
        data: result,
    });
});

// get single category controller
const getSingleCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.getSingleCategoryFromDB(
        req.params.id,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category retrieved successfully',
        data: result,
    });
});

// delete single category controller
const deleteSingleCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.deleteSingleCategoryFromDB(
        req.params.id,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully',
        data: result,
    });
});

export const CategoryControllers = {
    createCategory,
    getAllCategorys,
    getSingleCategory,
    deleteSingleCategory,
};

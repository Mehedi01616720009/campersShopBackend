import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import formDataHandler from '../../middlewares/formDataHanlder';
import { CategoryValidations } from './category.validation';
import { CategoryControllers } from './category.controller';

const router = express.Router();

// create category route
router.post(
    '/',
    upload.single('file'),
    formDataHandler,
    validateRequest(CategoryValidations.createCategoryValidationSchema),
    CategoryControllers.createCategory,
);

// get all categories route
router.get('/', CategoryControllers.getAllCategorys);

// get single category route
router.get('/:id', CategoryControllers.getSingleCategory);

// delete single category route
router.delete('/:id', CategoryControllers.deleteSingleCategory);

export const CategoryRoutes = router;

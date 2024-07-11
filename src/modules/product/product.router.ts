import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import formDataHandler from '../../middlewares/formDataHanlder';

const router = express.Router();

// create product route
router.post(
    '/',
    upload.single('file'),
    formDataHandler,
    validateRequest(ProductValidations.createProductValidationSchema),
    ProductControllers.createProduct,
);

// get all products route
router.get('/', ProductControllers.getAllProducts);

// get single product route
router.get('/:id', ProductControllers.getSingleProduct);

// update single product route
router.patch(
    '/:id',
    upload.single('file'),
    formDataHandler,
    validateRequest(ProductValidations.updateSingleProductValidationSchema),
    ProductControllers.updateSingleProduct,
);

// delete single product route
router.delete('/:id', ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;

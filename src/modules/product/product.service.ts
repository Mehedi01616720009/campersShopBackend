import { Product } from './product.model';
import { IProduct } from './product.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import generateImageName from '../../utils/generateImageName';
import { Category } from '../category/category.model';
import { productSearchableFields } from './product.constant';

// create product
const createProductIntoDB = async (file: any, payload: IProduct) => {
    // check category
    const category = await Category.findById(payload.category);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, 'No category exist');
    }

    // generate image name
    const imageName = generateImageName(payload.name);

    // wait for cloudinary response
    const images: any = await sendImageToCloudinary(imageName, file?.path);

    // include image url to payload
    payload.images = [];
    payload.images.push(images?.secure_url);

    const result = (await Product.create(payload)).populate('category');
    return result;
};

// get all products
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
    const fetchQuery = new QueryBuilder(
        Product.find().populate('category'),
        query,
    )
        .search(productSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await fetchQuery.modelQuery;
    const meta = await fetchQuery.countTotal();
    return { result, meta };
};

// get single product
const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById(id).populate('category');
    return result;
};

// update single product
const updateSingleProductIntoDB = async (
    id: string,
    file: any,
    payload: Partial<IProduct>,
) => {
    // check product
    const product = await Product.isProductExistById(id);
    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, 'No product exist');
    }

    if (payload?.category) {
        const category = await Category.findById(payload.category);
        if (!category) {
            throw new AppError(httpStatus.NOT_FOUND, 'No category exist');
        }
    }

    if (file?.path) {
        // generate image name
        const imageName = generateImageName(product.name);

        // wait for cloudinary response
        const images: any = await sendImageToCloudinary(imageName, file?.path);

        // include image url to payload
        payload.images = product.images || [];
        payload.images?.push(images?.secure_url);
    }

    // update product
    await Product.findByIdAndUpdate(id, payload, {
        new: true,
    });

    // get this data
    const result = await Product.findById(id).populate('category');
    return result;
};

// delete single product
const deleteSingleProductFromDB = async (id: string) => {
    // check product
    const product = await Product.isProductExistById(id);
    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, 'No product exist');
    }

    const result = await Product.findByIdAndDelete(id);
    return result;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductIntoDB,
    deleteSingleProductFromDB,
};

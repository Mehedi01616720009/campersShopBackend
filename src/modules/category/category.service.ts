import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ICategory } from './category.interface';
import { Category } from './category.model';
import generateImageName from '../../utils/generateImageName';
import { categorySearchableFields } from './category.constant';

// create category
const createCategoryIntoDB = async (file: any, payload: ICategory) => {
    // generate image name
    const imageName = generateImageName(payload.name);

    // wait for cloudinary response
    const images: any = await sendImageToCloudinary(imageName, file?.path);

    // include image url to payload
    payload.image = images?.secure_url;

    const result = await Category.create(payload);
    return result;
};

// get all Categories
const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
    const fetchQuery = new QueryBuilder(Category.find(), query)
        .search(categorySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await fetchQuery.modelQuery;
    const meta = await fetchQuery.countTotal();
    return { result, meta };
};

// get single Category
const getSingleCategoryFromDB = async (id: string) => {
    const result = await Category.findById(id);
    return result;
};

// delete single Category
const deleteSingleCategoryFromDB = async (id: string) => {
    // check Category
    const category = await Category.isCategoryExistById(id);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, 'No Category exist');
    }

    const result = await Category.findByIdAndDelete(id);
    return result;
};

export const CategoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getSingleCategoryFromDB,
    deleteSingleCategoryFromDB,
};

import { Schema, model } from 'mongoose';
import { ICategory, ICategoryModel } from './category.interface';

// category schema
const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        image: {
            type: String,
            required: [true, 'Image is required'],
        },
    },
    {
        timestamps: true,
    },
);

// category model static function (isCategoryExistById)
categorySchema.statics.isCategoryExistById = async function (id: string) {
    return await Category.findById(id);
};

// category model
export const Category = model<ICategory, ICategoryModel>(
    'Category',
    categorySchema,
);

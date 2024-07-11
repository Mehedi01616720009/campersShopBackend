import mongoose, { Schema, model } from 'mongoose';
import { IProduct, IProductModel } from './product.interface';
import { productStock } from './product.constant';

// product schema
const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
        },
        stock: {
            type: String,
            enum: productStock,
            required: [true, 'Stock is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
        },
        description: {
            type: String,
            required: [true, 'Description number is required'],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Category is required'],
            ref: 'Category',
        },
        images: {
            type: [String],
            required: [true, 'Image is required'],
        },
    },
    {
        timestamps: true,
    },
);

// product model static function (isProductExistById)
productSchema.statics.isProductExistById = async function (id: string) {
    return await Product.findById(id);
};

// product model
export const Product = model<IProduct, IProductModel>('Product', productSchema);

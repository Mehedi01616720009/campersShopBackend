import { Model, Types } from 'mongoose';

// product interface
export interface IProduct {
    name: string;
    price: number;
    stock: 'inStock' | 'outStock';
    quantity: number;
    description: string;
    category: Types.ObjectId;
    images?: string[];
}

export interface IProductData extends IProduct {
    _id: string;
}

// product static model interface
export interface IProductModel extends Model<IProduct> {
    isProductExistById(id: string): Promise<IProductData | null>;
}

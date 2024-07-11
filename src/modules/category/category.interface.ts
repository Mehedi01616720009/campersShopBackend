import { Model } from 'mongoose';

// category interface
export interface ICategory {
    name: string;
    image?: string;
}

export interface ICategoryData extends ICategory {
    _id: string;
}

// category static model interface
export interface ICategoryModel extends Model<ICategory> {
    isCategoryExistById(id: string): Promise<ICategoryData | null>;
}

import { Types } from 'mongoose';

// customer interface
export interface ICustomer {
    name: string;
    email: string;
    phone: string;
    address: string;
}

// ordered products interface
export type TOrderedProducts = {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
};

// order interface
export interface IOrder {
    id: string;
    customer: ICustomer;
    products: TOrderedProducts[];
}

// loggoed user interface
export interface IOrderData extends IOrder {
    _id: string;
}

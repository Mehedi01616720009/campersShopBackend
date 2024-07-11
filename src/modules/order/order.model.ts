import mongoose, { Schema, model } from 'mongoose';
import { ICustomer, IOrder, TOrderedProducts } from './order.interface';

// customer schema
const customerSchema = new Schema<ICustomer>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
});

// ordered product schema
const orderedProductSchema = new Schema<TOrderedProducts>({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product id is required'],
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
});

// order schema
const orderSchema = new Schema<IOrder>(
    {
        id: {
            type: String,
            unique: true,
        },
        customer: {
            type: customerSchema,
            required: [true, 'Name is required'],
        },
        products: {
            type: [orderedProductSchema],
            required: [true, 'Products is required'],
        },
    },
    {
        timestamps: true,
    },
);

// order model
export const Order = model<IOrder>('Order', orderSchema);

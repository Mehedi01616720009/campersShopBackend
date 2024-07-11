import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import generateUniqueId from '../../utils/generateUniqueId';
import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { orderSearchableFields } from './order.constant';
import mongoose from 'mongoose';

// create order
const createOrderIntoDB = async (payload: IOrder) => {
    await Promise.all(
        payload.products.map(async item => {
            // check product
            const product = await Product.findOne({
                _id: item.productId,
                quantity: { $gte: item.quantity },
                price: item.price,
            });
            if (!product) {
                throw new AppError(httpStatus.NOT_FOUND, 'No product exist');
            }
        }),
    );

    payload.id = await generateUniqueId();

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const result = await Order.create([payload], { session });
        await Promise.all(
            payload.products.map(async item => {
                // decrease stock quantity
                const product = await Product.findByIdAndUpdate(
                    item.productId,
                    { $inc: { quantity: -item.quantity } },
                    { new: true, session },
                );

                if ((product?.quantity as number) <= 0) {
                    await Product.findByIdAndUpdate(
                        item.productId,
                        { stock: 'outStock' },
                        { new: true, session },
                    );
                }
            }),
        );

        await session.commitTransaction();
        await session.endSession();

        return result;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
    }
};

// get all orders
const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
    const fetchQuery = new QueryBuilder(
        Order.find().populate('products.productId'),
        query,
    )
        .search(orderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await fetchQuery.modelQuery;
    const meta = await fetchQuery.countTotal();
    return { result, meta };
};

// get single order
const getSingleOrderFromDB = async (id: string) => {
    const result = await Order.findOne({ id }).populate('products.productId');
    return result;
};

export const OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getSingleOrderFromDB,
};

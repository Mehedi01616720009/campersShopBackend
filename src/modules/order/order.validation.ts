import { z } from 'zod';

const customerValidationSchema = z.object({
    name: z.string({
        required_error: 'Customer name is required',
    }),
    email: z.string({
        required_error: 'Customer email is required',
    }),
    phone: z.string({
        required_error: 'Customer phone is required',
    }),
    address: z.string({
        required_error: 'Customer address is required',
    }),
});

const orderedProductValidationSchema = z.object({
    productId: z.string({
        required_error: 'Product id is required',
    }),
    quantity: z.number({
        required_error: 'Quantity is required',
    }),
    price: z.number({
        required_error: 'Price phone is required',
    }),
});

// create order validation
const createOrderValidationSchema = z.object({
    body: z.object({
        customer: customerValidationSchema,
        products: z.array(orderedProductValidationSchema).nonempty({
            message: 'Products is required',
        }),
    }),
});

export const OrderValidations = {
    createOrderValidationSchema,
};

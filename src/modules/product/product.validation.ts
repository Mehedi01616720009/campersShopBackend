import { z } from 'zod';
import { productStock } from './product.constant';

// create product validation
const createProductValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        price: z.number({
            required_error: 'price is required',
        }),
        stock: z.enum([...productStock] as [string, ...string[]], {
            required_error: 'Stock is required',
        }),
        quantity: z.number({
            required_error: 'Quantity is required',
        }),
        description: z.string({
            required_error: 'Description is required',
        }),
        category: z.string({
            required_error: 'Category is required',
        }),
    }),
});

// update single product validation
const updateSingleProductValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        price: z.number().optional(),
        stock: z.enum([...productStock] as [string, ...string[]]).optional(),
        quantity: z.number().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
    }),
});

export const ProductValidations = {
    createProductValidationSchema,
    updateSingleProductValidationSchema,
};

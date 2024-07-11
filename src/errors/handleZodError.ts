import { ZodError, ZodIssue } from 'zod';
import { TErrorResponse, TErrorMessages } from '../interface/error';
import httpStatus from 'http-status';

const handleZodError = (err: ZodError): TErrorResponse => {
    const errorMessages: TErrorMessages = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = httpStatus.BAD_REQUEST;
    return {
        statusCode,
        message: 'Validation error',
        errorMessages,
    };
};

export default handleZodError;

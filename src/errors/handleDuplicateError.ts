import httpStatus from 'http-status';
import { TErrorResponse, TErrorMessages } from '../interface/error';

const handleDuplicateError = (err: any): TErrorResponse => {
    const match = err.message.match(/"([^"]*)"/);
    const extractMessage = match && match[1];
    const errorMessages: TErrorMessages = [
        {
            path: '',
            message: `${extractMessage} is already exist`,
        },
    ];
    const statusCode = httpStatus.BAD_REQUEST;
    return {
        statusCode,
        message: 'Invalid ID',
        errorMessages,
    };
};

export default handleDuplicateError;

import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

// cloudinary config
cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
});

export const sendImageToCloudinary = async (
    imageName: string,
    path: string,
) => {
    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(path, {
            public_id: imageName,
        });

        // unlink image from server
        fs.unlink(path, err => {
            if (err) {
                console.log({
                    success: false,
                    message: 'File cannot be delete',
                    errorMessages: {
                        path: '/',
                        message: err?.message,
                    },
                    stack: err,
                });
            }
        });

        return uploadResult;
    } catch (err) {
        throw new AppError(httpStatus.CONFLICT, 'Product image cannot upload');
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

export const upload = multer({ storage: storage });

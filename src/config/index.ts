import dotenv from 'dotenv';
import path from 'path';

// .env connection
dotenv.config({ path: path.join((process.cwd(), '.env')) });

// env variables
export default {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    frontendBaseUrl: process.env.FRONTEND_BASE_URL,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

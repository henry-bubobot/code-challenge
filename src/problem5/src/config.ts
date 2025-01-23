import dotenv from 'dotenv';
import { cleanEnv, str, num } from 'envalid';

// Load .env file
dotenv.config();

// Validate and parse environment variables
const env = cleanEnv(process.env, {
    PORT: num({ default: 3000 }),
    DATABASE_URL: str(),
});

export default env;
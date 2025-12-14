import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'EMAIL_USER',
  'EMAIL_PASS',
  'FRONTEND_URL',
  'PORT'
];

export const validateEnv = () => {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Export validated env vars
export const config = {
  mongoUri: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  emailUser: process.env.EMAIL_USER!,
  emailPass: process.env.EMAIL_PASS!,
  frontendUrl: process.env.FRONTEND_URL!,
  port: process.env.PORT || '5000',
};
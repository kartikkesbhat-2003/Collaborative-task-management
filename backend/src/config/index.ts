import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface EnvConfig {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  FRONTEND_URL: string;
  SENTRY_DSN?: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

function validateEnv(): EnvConfig {
  const requiredEnvVars = [
    'MONGO_URI',
    'JWT_SECRET',
    'EMAIL_USER',
    'EMAIL_PASS',
    'FRONTEND_URL'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return {
    PORT: parseInt(process.env.PORT || '5000', 10),
    MONGO_URI: process.env.MONGO_URI!,
    JWT_SECRET: process.env.JWT_SECRET!,
    EMAIL_USER: process.env.EMAIL_USER!,
    EMAIL_PASS: process.env.EMAIL_PASS!,
    FRONTEND_URL: process.env.FRONTEND_URL!,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development'
  };
}

export const config = validateEnv();
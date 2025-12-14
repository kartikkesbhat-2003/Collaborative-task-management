import jwt from 'jsonwebtoken';
import { config } from '../config';

export const signToken = (payload: object) =>
  jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: '7d',
  });

export const verifyToken = (token: string) =>
  jwt.verify(token, config.JWT_SECRET);

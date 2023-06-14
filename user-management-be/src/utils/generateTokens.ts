import { sign } from 'jsonwebtoken';
import { TokenUserPayload } from './definitions';
import { randomBytes } from 'crypto';

export const generateAccessToken = (user: TokenUserPayload) => {
  return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // TODO change to 10m
};

export const generateRefreshAccessToken = (user: TokenUserPayload) => {
  return sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};

export const generateRandomToken = (length = 32): string => {
  const token = randomBytes(length).toString('hex');
  return token;
};

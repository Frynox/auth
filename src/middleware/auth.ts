import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { JWT_SECRET } from '../config';

// Middleware to verify authorization token
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = (decodedToken as { id: string }).id;
    req.user = { id: userId } as User;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid authorization token' });
  }
};

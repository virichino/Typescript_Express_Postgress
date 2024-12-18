import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Formato esperado: "Bearer <token>"
  try {
    const user = verifyToken(token);
    req.user = user; // Adjuntar usuario a la solicitud
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }
};
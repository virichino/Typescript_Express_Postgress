import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
      }

      const payload = verifyToken(token);

      if (!roles.includes(payload.role)) {
        res.status(403).json({ error: 'Access denied' });
        return;
      }

      req.user = payload; // Adjuntar datos del usuario al objeto `req`
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};
import { Router } from 'express';
import { check } from 'express-validator';
import { validate } from '../middleware/validate';
import { register, login } from '../controllers/authController';

const router = Router();

router.post(
  '/register',
  [
    check('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 10}).withMessage('Name must be les than 10 characters long'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    check('role')
      .optional()
      .isIn(['user', 'admin']).withMessage('Invalid role'), // Solo permite roles válidos
    validate, // Middleware de validación
  ],
  register
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').notEmpty().withMessage('Password is required'),
    validate, // Middleware de validación
  ],
  login
);

export default router;
import { Router } from 'express';
import { authorize } from '../middleware/authorize';
import { getAllUsers, addUser } from '../controllers/userController';

const router = Router();

router.get(
  '/',
  authorize(['admin']), // Solo los administradores pueden acceder
  getAllUsers
);

router.post(
  '/',
  authorize(['admin', 'manager']), // Administradores y gerentes pueden acceder
  addUser
);

export default router;

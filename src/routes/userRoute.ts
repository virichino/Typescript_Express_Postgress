import { Router } from 'express';
import { getAllUsers, addUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.post('/', addUser);

export default router;
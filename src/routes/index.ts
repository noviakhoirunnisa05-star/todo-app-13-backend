import { Router } from 'express';
import authRoutes from './authRoutes';
import todoRoutes from './todoRoutes';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// 1. Auth routes (Tanpa verifyToken)
router.use('/auth', authRoutes);

// 2. Todo routes (Pakai verifyToken)
router.use('/todos', verifyToken, todoRoutes);

export default router;
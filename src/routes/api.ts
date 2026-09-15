import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middlewares/validator.js';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registrasi Pengguna Baru (PUBLIK - Tanpa authMiddleware)
 */
router.post('/auth/register', validateRegister, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login Pengguna (PUBLIK - Tanpa authMiddleware)
 */
router.post('/auth/login', validateLogin, login);

export default router;
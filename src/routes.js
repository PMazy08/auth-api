import express from 'express';
import { register, login, getAllUsers } from './controllers/authController.js';
import { authenticateToken } from './middlewares/authMiddleware.js';

const router = express.Router();

// เส้นทางการลงทะเบียน
router.post('/register', register);

// เส้นทางการเข้าสู่ระบบ
router.post('/login', login);

// เส้นทางดึงผู้ใช้ทั้งหมด (ต้องมี token)
router.get('/users', authenticateToken, getAllUsers);

export default router;

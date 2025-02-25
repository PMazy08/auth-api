import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findAllUsers } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

// ลงทะเบียน (Signup)
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกข้อมูลผู้ใช้ผ่าน model
    await createUser(username, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// เข้าสู่ระบบ (Login)
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ดึงข้อมูลผู้ใช้จาก model
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // สร้าง token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ดึงข้อมูลผู้ใช้ทั้งหมด (ต้องมี token)
export const getAllUsers = async (req, res) => {
    try {
      // เรียกใช้งาน model เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
      const users = await findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

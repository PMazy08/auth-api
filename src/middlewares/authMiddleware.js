import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  // โดยทั่วไปจะส่ง token มาใน Header: "Authorization: Bearer <token>"
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // ตัดคำว่า Bearer ออก
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // ตรวจสอบ token
    const decoded = jwt.verify(token, JWT_SECRET);
    // เก็บ payload ไว้ใน req.user เพื่อใช้งานต่อใน Controller
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

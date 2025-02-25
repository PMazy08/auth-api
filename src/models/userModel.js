import db from '../database.js';

export const createUser = async (username, email, hashedPassword) => {
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  return result;
};

export const findUserByEmail = async (email) => {
  const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return users.length > 0 ? users[0] : null;
};

export const findAllUsers = async () => {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  };
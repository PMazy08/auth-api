import app from './src/app.js'; // ✅ ต้องใส่ `.js` ด้วย
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

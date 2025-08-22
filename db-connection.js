import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const uri = process.env.DB_URI;

export async function startConnection() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to', mongoose.connection.name);
    return mongoose;
  } catch (error) {
    console.error(error);
    await closeConnection();
  }
}

export async function closeConnection() {
  await mongoose.disconnect();
}

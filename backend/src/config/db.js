import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/3sixty_db';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`[Database] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${mongoURI}: ${error.message}`);
    console.warn(`[Database Warning] Please ensure MongoDB is running (e.g., mongod or MongoDB Atlas URI in .env).`);
  }
};

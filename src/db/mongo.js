import mongoose from 'mongoose';
import config from '../config/config.js';

mongoose.set('strictQuery', true);


export const connectMongo = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, {
      dbName: config.DB_NAME,
    });
    console.log(`✅ Conectado a MongoDB: ${config.DB_NAME}`);
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};
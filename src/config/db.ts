import moongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
  try {
    const connection = await moongoose.connect(process.env.MONGO_URI || '');
    console.log(colors.bgGreen('Connected to MongoDB'), connection.connection.host);
  } catch (error) {
    console.error(colors.bgRed('Error connecting to MongoDB:'), error);
    process.exit(1);
  }
}
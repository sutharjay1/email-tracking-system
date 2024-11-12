import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		await mongoose.connect(Bun.env.MONGO_URI as string);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
};

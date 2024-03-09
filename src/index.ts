import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import dogRoutes from './routes/dogRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/favorites', favoriteRoutes);

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

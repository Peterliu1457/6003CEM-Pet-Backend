import express from 'express';
import { addToFavorite, removeFromFavorite } from '../controllers/favoriteController';
import { useAuthGuard } from '../middlewares/useAuthGuard';

const router = express.Router();


router.post('/add', useAuthGuard, addToFavorite);
router.delete('/remove/:favoriteId', useAuthGuard, removeFromFavorite);

export default router;

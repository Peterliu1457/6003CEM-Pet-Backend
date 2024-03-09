import express from 'express';
import { createDog, deleteDog, updateDog } from '../controllers/dogController';
import { useAuthGuard } from '../middlewares/useAuthGuard';

const router = express.Router();


router.post('/', useAuthGuard, createDog);
router.delete('/:id', useAuthGuard, deleteDog);
router.put('/:id', useAuthGuard, updateDog);

export default router;

import express from 'express';
import { createDog, deleteDog, updateDog, getCreatedDogs, getDogById } from '../controllers/dogController';
import { useAuthGuard } from '../middlewares/useAuthGuard';

const router = express.Router();


router.get('/own', useAuthGuard, getCreatedDogs);
router.get('/:dogId', useAuthGuard, getDogById);
router.post('/', useAuthGuard, createDog);
router.delete('/:id', useAuthGuard, deleteDog);
router.put('/:id', useAuthGuard, updateDog);


export default router;

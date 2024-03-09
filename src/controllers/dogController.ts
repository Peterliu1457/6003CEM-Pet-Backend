import Dog from '../models/Dog';
import { Request, Response } from 'express';

export const createDog = async (req: Request, res: Response) => {
    try {
        const dog = new Dog(req.body);
        await dog.save();
        res.status(201).send(dog);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

export const deleteDog = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const dog = await Dog.findByIdAndDelete(req.params.id);
        if (!dog) {
            return res.status(404).send('Dog not found');
        }
        if (dog.charity.toString() !== user.id.toString()) {
            return res.status(403).send('You are not authorized to delete this dog');
        }
        res.status(200).send(dog);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const updateDog = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!dog) {
            return res.status(404).send('Dog not found');
        }
        if (dog.charity.toString() !== user.id.toString()) {
            return res.status(403).send('You are not authorized to update this dog');
        }
        res.status(200).send(dog);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

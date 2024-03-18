import Dog from '../models/Dog';
import { Request, Response } from 'express';
import {mongo} from 'mongoose';

export const createDog = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const dog = new Dog({ ...req.body, charity: new mongo.ObjectId(user!.id) });
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

export const getCreatedDogs = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const dogs = await Dog.find({ charity: new mongo.ObjectId(user.id) });
        res.status(200).send(dogs);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export const getDogById = async (req: Request, res: Response) => {
    try {
        const dog = await Dog.findById(req.params.dogId);
        if (!dog) {
            return res.status(404).send('Dog not found');
        }
        res.status(200).send(dog);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

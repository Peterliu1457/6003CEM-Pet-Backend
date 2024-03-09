import Favorite from '../models/Favorite';
import User from '../models/User';
import { Request, Response } from 'express';
import { mongo } from 'mongoose';

export const addToFavorite = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { dogId } = req.body;

        const user = await User.findById(userId);
        if (!user || user.type !== 'adopt') {
            return res.status(403).send({ message: 'Only adopt users can add favorites.' });
        }

        const favorite = new Favorite({ dog: dogId, user: userId });
        await favorite.save();
        res.status(201).send(favorite);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const removeFromFavorite = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { favoriteId } = req.params;


        const favorite = await Favorite.findOne({ _id: new mongo.ObjectId(favoriteId), user: new mongo.ObjectId(userId) });
        if (!favorite) {
            return res.status(404).send({ message: 'Favorite not found or not belongs to you.' });
        }

        await Favorite.findByIdAndDelete(favoriteId);
        res.status(200).send({ message: 'Removed from favorites.' });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

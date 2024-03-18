import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const JWT_SECRET = 'secret';

const Register_Codes: string[] = [
    '1234'
];

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, type, register_code } = req.body;

        if (type === 'charity' && !Register_Codes.includes(register_code)) {
            return res.status(403).send('Invalid register code');
        }

        const oldUserEmail = await User.findOne({ email });
        if (oldUserEmail) {
            return res.status(409).send('User already exists');
        }

        const oldUsername = await User.findOne({
            username,
        });
        if (oldUsername) {
            return res.status(409).send('Username already exists');
        }


        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ username, email, passwordHash, type });

        await user.save();
        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        res.status(201).send({ token, type });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).send('Email or password is incorrect');
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.status(200).send({ token, type: user.type });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

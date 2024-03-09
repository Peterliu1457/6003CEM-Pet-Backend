import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret';

interface UserData {
    id: string;
}


declare global {
    namespace Express {
        interface Request {
            user?: UserData;
        }
    }
}

export const useAuthGuard = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({ message: 'Authorization token missing or malformed' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as UserData;

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
};

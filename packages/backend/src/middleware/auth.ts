import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


export interface AuthRequest extends Request {
  user?: Omit<User, 'password'>;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication invalid: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('JWT_SECRET not defined in environment variables');
    }

    try {
        const payload = jwt.verify(token, jwtSecret) as Omit<User, 'password'>;
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication invalid: Token is invalid' });
    }
}
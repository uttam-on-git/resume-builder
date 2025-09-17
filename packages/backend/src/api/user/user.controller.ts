import { NextFunction, Request, Response } from "express";
import { findUserByEmail, requestPasswordReset, resetPassword, verifyEmail, verifyPassword } from "./user.service";
import { createUser } from "./user.service";
import jwt from "jsonwebtoken"
import { AuthRequest } from "../../middleware/auth";

export const registerUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        //check if user exist
        const existingUser = await findUserByEmail(email)
        if(existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            })
        }

        //create new user
        const newUser = await createUser({ email, password})

        const { password: _, ...userWithoutPassword } = newUser

        return res.status(201).json({
            message: 'User registered successfully. Please check your email to verify your account.',
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const loginUserHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await verifyPassword({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not defined in environment variables');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getMeHandler = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  res.status(200).json({ user });
};

export const verifyEmailHandler = async (req: Request, res: Response) => {
    const { token } = req.query;

    if (typeof token !== 'string') {
        return res.status(400).json({ message: 'Invalid token' });
    }

    try {
        await verifyEmail(token);
        return res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
};

export const requestPasswordResetHandler = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        await requestPasswordReset(email);
        return res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
    const { token, password } = req.body;
    try {
        await resetPassword(token, password);
        return res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
};
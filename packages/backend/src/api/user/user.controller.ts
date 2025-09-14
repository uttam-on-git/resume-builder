import { Request, Response } from "express";
import { findUserByEmail } from "./user.service";
import { createUser } from "./user.service";

export const registerUserHandler = async (req: Request, res: Response) => {
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
            message: 'User registered successfully',
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
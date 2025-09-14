import { User } from "@prisma/client";
import db from "../../lib/db";
import bcrypt from "bcryptjs"

export const createUser = async (input: Pick<User, 'email' | 'password'>) => {
    const { email, password} = input
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
        data: {
            email: email.toLowerCase(),
            password: hashedPassword,
        },
    });

    return user
}

export const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email: email.toLowerCase() },
  });
};

export const verifyPassword = async ({ email, password }: Pick<User, 'email' | 'password'>) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return false;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid ? user : false;
};
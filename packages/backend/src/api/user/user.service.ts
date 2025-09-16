import { User } from "@prisma/client";
import db from "../../lib/db";
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { sendEmail } from "../../lib/email";

export const createUser = async (input: Pick<User, 'email' | 'password'>) => {
    const { email, password} = input
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await db.user.create({
        data: {
            email: email.toLowerCase(),
            password: hashedPassword,
            verificationToken,
            verificationTokenExpires,
        },
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Verify your email address',
      html: `<p>Please click this link to verify your email address: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
    });

    return user
}

export const verifyEmail = async (token: string) => {
    const user = await db.user.findUnique({
        where: { verificationToken: token },
    });

    if (!user || !user.verificationTokenExpires || user.verificationTokenExpires < new Date()) {
        throw new Error('Token is invalid or has expired.');
    }

    return db.user.update({
        where: { id: user.id },
        data: {
            emailVerified: new Date(),
            verificationToken: null,
            verificationTokenExpires: null,
        },
    });
};

export const requestPasswordReset = async (email: string) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return;
    }

    const passwordResetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await db.user.update({
        where: { id: user.id },
        data: {
            passwordResetToken,
            passwordResetTokenExpires,
        },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${passwordResetToken}`;
    await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        html: `<p>Please click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });
};

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

export const resetPassword = async (token: string, password: string) => {
    const user = await db.user.findUnique({
        where: { passwordResetToken: token },
    });

    if (!user || !user.passwordResetTokenExpires || user.passwordResetTokenExpires < new Date()) {
        throw new Error('Token is invalid or has expired.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return db.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetTokenExpires: null,
        },
    });
};
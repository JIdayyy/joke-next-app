/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from "../../../prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "src/service/security/jwt";

export type UserWithoutPassword = Omit<User, "password">;

const registerHandler: NextApiHandler<
    UserWithoutPassword | { message: string }
> = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password, userName } = req.body;

    const saltedPassword = bcrypt.hashSync(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                userName,
                password: saltedPassword,
            },
        });

        const token = await sign(
            {
                id: newUser.id,
                email: newUser.email,
                userName: newUser.userName,
            },
            process.env.SECRET as string,
        );

        const { password, ...userWithoutPassword } = newUser;

        res.setHeader("Authorization", `Bearer ${token}`);

        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default registerHandler;

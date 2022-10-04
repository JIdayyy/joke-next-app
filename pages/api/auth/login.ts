/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserWithoutPassword } from "./register";
import { NextApiHandler } from "next";
import prisma from "../../../prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "src/service/security/jwt";

const loginHandler: NextApiHandler<
    UserWithoutPassword | { message: string }
> = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email,
            },
        });

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { password: removedPassword, ...userWithoutPassword } = user;

        const token = await sign(
            {
                id: user.id,
                email: user.email,
                userName: user.userName,
            },
            process.env.SECRET as string,
        );

        res.setHeader("Authorization", `Bearer ${token}`);

        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export default loginHandler;

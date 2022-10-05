/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiHandler } from "next";
import { sign } from "src/service/security/jwt";
import bcrypt from "bcryptjs";
import prisma from "../../../../prisma/client";

const registerHandler: NextApiHandler = async (req, res) => {
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@prisma/client";
import { NextApiHandler } from "next";
import authController from "src/service/API/authentication/controller";

export type UserWithoutPassword = Omit<User, "password">;

const registerHandler: NextApiHandler<
    UserWithoutPassword | { message: string }
> = async (req, res) => {
    if (req.method === "POST") return authController.register(req, res);

    return res.status(405).json({ message: "Method not allowed" });
};

export default registerHandler;

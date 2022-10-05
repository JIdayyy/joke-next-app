/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserWithoutPassword } from "./register";
import { NextApiHandler } from "next";
import controller from "src/service/API/authentication/controller";

const loginHandler: NextApiHandler<
    UserWithoutPassword | { message: string }
> = async (req, res) => {
    if (req.method === "POST") return controller.login(req, res);

    return res.status(405).json({ message: "Method not allowed" });
};

export default loginHandler;

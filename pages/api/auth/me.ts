import { NextApiHandler } from "next";
import authController from "src/service/API/authentication/controller";

const checkMe: NextApiHandler = async (req, res) => {
    if (req.method === "POST") return authController.me(req, res);

    return res.status(405).json({ message: "Method not allowed" });
};

export default checkMe;

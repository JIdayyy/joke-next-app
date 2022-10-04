import { NextApiHandler } from "next";
import prisma from "../../../prisma/client";

const categoryHandler: NextApiHandler = async (req, res) => {
    if (req.method === "GET") {
        try {
            const categories = await prisma.category.findMany();

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: "Something wrong happened" });
        }
    }
};

export default categoryHandler;

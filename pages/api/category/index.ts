import { NextApiHandler } from "next";
import controller from "../../../src/service/API/category/controller";

const categoryHandler: NextApiHandler = async (req, res) => {
    if (req.method === "GET") return controller.getALl(req, res);

    return res.status(405).json("Method not allowed");
};

export default categoryHandler;

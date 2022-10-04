import { NextApiHandler } from "next";
import jokeController from "src/service/API/joke/controller";

const jokeHandler: NextApiHandler = (req, res) => {
    if (req.method === "GET") return jokeController.getAll(req, res);

    if (req.method === "POST") return jokeController.create(req, res);

    return res.status(405).json("Method not alloed");
};

export default jokeHandler;

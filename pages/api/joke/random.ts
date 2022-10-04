import { NextApiHandler } from "next";
import jokeController from "src/service/API/joke/controller";

const getRandomJokeHandler: NextApiHandler = async (req, res) => {
    if (req.method === "GET") return jokeController.random(req, res);

    return res.status(405).json("Method not alloed");
};

export default getRandomJokeHandler;

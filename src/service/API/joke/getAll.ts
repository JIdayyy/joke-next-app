import { NextApiHandler } from "next";
import prisma from "../../../../prisma/client";
import { Joke } from "@prisma/client";

const getAllJokes: NextApiHandler<Joke[]> = async (req, res) => {
    try {
        const jokes = await prisma.joke.findMany();

        return res.status(200).json(jokes);
    } catch (error) {
        console.log(error);
        throw new Error(JSON.stringify(error));
    }
};

export default getAllJokes;

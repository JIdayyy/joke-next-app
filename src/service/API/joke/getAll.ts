import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { Joke } from "@prisma/client";

const getAllJokes: NextApiHandler<Joke[]> = async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    try {
        const jokes = await prisma.joke.findMany();

        return res.status(200).json(jokes);
    } catch (error) {
        console.log(error);
        throw new Error(JSON.stringify(error));
    }
};

export default getAllJokes;

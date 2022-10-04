import { NextApiHandler } from "next";
import prisma from "../../../../prisma/client";

const getRandomJoke: NextApiHandler = async (req, res) => {
    try {
        const randomJoke = await prisma.$queryRaw`SELECT * FROM "public"."Joke"
        ORDER BY RANDOM()
        LIMIT 1`;

        return res.status(200).json(randomJoke);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export default getRandomJoke;

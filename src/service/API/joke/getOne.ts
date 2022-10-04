import { Joke } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from "../../../../prisma/client";

const getOneJoke: NextApiHandler<Joke | { message: string }> = async (
    req,
    res,
) => {
    const { id } = req.query;
    try {
        const joke = await prisma.joke.findUniqueOrThrow({
            where: {
                id: id as string,
            },
        });

        return res.status(200).json(joke);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default getOneJoke;

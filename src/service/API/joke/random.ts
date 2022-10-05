/* eslint-disable @typescript-eslint/no-unused-vars */
import { Joke, User } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from "../../../../prisma/client";

export type JokeWithUserRawSQL = {
    0: Joke & {
        user: User;
    };
};

const getRandomJoke: NextApiHandler = async (req, res) => {
    const { user } = req.query;

    try {
        const randomJoke: JokeWithUserRawSQL =
            await prisma.$queryRaw`SELECT *  FROM "public"."Joke"  ORDER BY RANDOM() LIMIT 1`;

        const jokeUser = await prisma.user.findUnique({
            where: {
                id: randomJoke[0].userId,
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                password: false,
                userName: true,
            },
        });

        const jokeWithUser = {
            0: { ...randomJoke[0], user: jokeUser },
        };
        console.log(jokeWithUser);
        return res.status(200).json(jokeWithUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export default getRandomJoke;

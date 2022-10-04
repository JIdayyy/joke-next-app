import { Joke } from "@prisma/client";
import { NextApiHandler } from "next";
import { verify } from "src/service/security/jwt";
import prisma from "../../../../prisma/client";

const createJoke: NextApiHandler<Joke | { message: string }> = async (
    req,
    res,
) => {
    const { body } = req;
    const token = req.headers.authorization?.split(" ")[1];

    const user = await verify(token as string, process.env.SECRET as string);

    try {
        const newJoke = await prisma.joke.create({
            data: {
                content: body.content,
                answer: body.answer,
                category: {
                    connect: {
                        id: body.categoryId,
                    },
                },
                user: {
                    connect: {
                        id: user.id as string,
                    },
                },
            },
        });

        return res.status(201).json(newJoke);
    } catch (error) {
        console.log(error);
        throw new Error(JSON.stringify(error));
    }
};

export default createJoke;

import { NextApiHandler } from "next";

const singleJokeHandler: NextApiHandler = (req, res) => {
    return res.status(405).end();
};

export default singleJokeHandler;

import { NextApiHandler } from "next";

const unauthorizedHandler: NextApiHandler = (req, res) => {
    res.status(401).json({ message: "Unauthorized" });
};

export default unauthorizedHandler;

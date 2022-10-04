import { JWTUserPayload } from "./../../../src/service/security/jwt";
import { NextApiHandler } from "next";
import { sign, verify } from "src/service/security/jwt";

const checkMe: NextApiHandler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json("Please login");
    }

    try {
        const user = await verify(token, process.env.SECRET as string);

        if (typeof user !== "object") {
            return res.status(401).json("Please login");
        }

        const newToken = await sign(
            user as JWTUserPayload,
            process.env.SECRET as string,
        );

        res.setHeader("Authorization", `Bearer ${newToken}`);

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export default checkMe;

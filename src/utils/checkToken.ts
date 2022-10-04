import { NextApiRequest } from "next";
import { JWTPayload } from "jose";
import jwt from "jsonwebtoken";

export const checkToken = async (
    req: NextApiRequest,
): Promise<JWTPayload | boolean> => {
    if (!req.headers.authorization) {
        return false;
    }

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET as string);

    if (typeof decodedToken === "object") {
        return decodedToken;
    }

    return false;
};

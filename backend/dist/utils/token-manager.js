import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    }); //Encrypting  JWT Token with the payload, JWT Secret & expiry duration.
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`]; //fetching auth token
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token not Received" });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) { //token Expired/not verified
                reject(err.message);
                return res.status(401).json({ message: "Token Exired" });
            }
            else {
                console.log("Token Verification Successful");
                resolve();
                res.locals.jwtData = success; //Express.js feature - we cant export local variables of one user defined middleware into another.
                return next(); //Returning to next middleware if verification is successful.
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map
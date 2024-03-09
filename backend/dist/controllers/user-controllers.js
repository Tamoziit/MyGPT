import User from "../models/User.js";
import { compare, hash } from "bcrypt"; //to encrypt a string(password) before storing it in backend
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        //get all users from DB
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        //user signup
        const { name, email, password } = req.body; //destructuring JSON request given by user during signup
        const existingUser = await User.findOne({ email }); //checking if a user with same email already exists.
        if (existingUser)
            return res.status(401).send("User already registered");
        const hashedPassword = await hash(password, 10); //(string, no. of rounds with which password is required to be encrypted to make it secure)
        const user = new User({ name, email, password: hashedPassword }); //Creating a new instance for a new user
        await user.save();
        //Create auth token & store cookie.
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        }); //Clears prev. cookie before creating new one for each login.
        const token = createToken(user._id.toString(), user.email, "7d"); //creating new token
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        }); //Sending HTTP only cookie to client
        return res.status(201).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        //user login
        const { email, password } = req.body; //destructuring JSON request given by user during signup
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not Registered");
        }
        const isPasswordCorrect = await compare(password, user.password); //Comparing hashed password instead of decrypt it directly using bcrypt's compare() function.
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect password");
        }
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        }); //Clears prev. cookie before creating new one for each login.
        const token = createToken(user._id.toString(), user.email, "7d"); //creating new token
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        }); //Sending HTTP only cookie to client
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        //verifying user & token
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registered Or Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const logoutUser = async (req, res, next) => {
    try {
        //verifying user & token
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registered Or Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        }); //Clearing user cookie to unauthorize the user.
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map
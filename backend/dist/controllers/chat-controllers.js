import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        //User validation last step
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not registered or Token Malfunctioned" });
        //Grab chats of validated user
        const chats = user.chats.map(({ role, content }) => ({ role, content })); //fetching chats
        chats.push({ content: message, role: "user" }); //memory backup of chats
        user.chats.push({ content: message, role: "user" }); //chats of the user
        //Sending all chats to openAI api.
        const config = configureOpenAI();
        const openai = new OpenAIApi(config); //fetching complete openai API.
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        //Getting the latest response to the current question.
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log("error");
        return res.status(500).json({ message: "Something went wrong. TRy Again." }); //server error
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //verifying user & token
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registered Or Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //verifying user & token
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registered Or Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = []; //NB: "@ts-ignore" ignores/doesn't consider the type errors in TS.
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map
import axios from "axios"

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", {email, password});
    if(res.status !== 200) { //Login not successful status
        throw new Error("Unable to Login!");
    }
    const data = await res.data;
    return data;
}

export const signupUser = async (name: string, email: string, password: string) => {
    const res = await axios.post("/user/signup", {name, email, password});
    if(res.status !== 201) { //Signup not successful status
        throw new Error("Unable to Signup!");
    }
    const data = await res.data;
    return data;
}

export const logoutUserFunc = async () => {
    const res = await axios.get("/user/logout");
    if(res.status !== 200) { 
        throw new Error("Unable to Logout...Try Again!");
    }
    const data = await res.data;
    return data;
}

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if(res.status !== 200) { //Not Authorized status
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
}

export const sendChatRequest = async (message: string) => {
    const res = await axios.post("/chat/new",{message});
    if(res.status !== 200) { //Not Authorized status
        throw new Error("Unable to send Chat");
    }
    const data = await res.data;
    return data;
}

export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");
    if(res.status !== 200) { //Not Authorized status
        throw new Error("Unable to send Chat");
    }
    const data = await res.data;
    return data;
}

export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");
    if(res.status !== 200) { 
        throw new Error("Unable to delete Chat");
    }
    const data = await res.data;
    return data;
}
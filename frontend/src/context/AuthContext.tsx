import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUserFunc, signupUser } from "../helpers/api-communicators";

//TypeScript object definition
type User = {
    name: string
    email: string
}
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>; //Promise returns nothing
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout:()=>Promise<void>;
};

//AuthProvider feature of ReactNode
const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({children} : {children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => { //executes after each refresh
        //fetch if the user's cookies are valid, then skip login
        async function checkStatus() {
            const data = await checkAuthStatus();
            if(data) {
                setUser({email: data.email, name: data.name});
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);

    const login = async(email: string, password: string) => {
        const data = await loginUser(email, password);
        if(data) {
            setUser({email: data.email, name: data.name});
            setIsLoggedIn(true);
        }
    }

    const signup = async(name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if(data) {
            setUser({email: data.email, name: data.name});
            setIsLoggedIn(true);
        }
    }

    const logout = async() => {
        await logoutUserFunc();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload(); //Reloading webpage to give time to server delete the HTTP Cookie, as it is not removed at once.
    }

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
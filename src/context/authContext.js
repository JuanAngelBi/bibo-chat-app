import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../services/firebase";


export const authContext = createContext() //Contiene el valor de user

export const useAuth = () => {             //En vez de llamar useContext y context, simplemente llamar al useAuth
    const context = useContext(authContext)
    return context
}

export function AuthProvider ({children}) {
    const signup = (email, password) =>
        //createUserWithEmailAndPassword(auth, email, password);
        console.log(email, password);

    return (
    <authContext.Provider value={{ signup }}>{children}</authContext.Provider>
    );
}
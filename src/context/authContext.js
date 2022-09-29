import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import { updateDoc, setDoc, doc } from "firebase/firestore";

export const authContext = createContext() //Contiene el valor de user

export const useAuth = () => {             //En vez de llamar useContext y context, simplemente llamar al useAuth
    const context = useContext(authContext)
    return context
}

export function AuthProvider({ children }) {
    //datos usuario
    const [user, setUser] = useState(null); //Nadie conectado al iniciar la app
    const [loading, setLoading] = useState(true);

    //registrar
    const signup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);
    //logear
    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password)
    //logout
    const logout = () => signOut(auth);                                 //El promise dice que es asincrono (toma algo de tiempo)
    //login google
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }

    //reset password
    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    const saveUser = async(userLogin) => {
        if (!userLogin) return
        await setDoc(doc(db,"usuarios",userLogin.user.uid),{
          uid: userLogin.user.uid,
          displayName: userLogin.user.displayName,
          email:userLogin.user.email,
          photoURL:userLogin.user.photoURL,
          isOnline: false
        }) 
      }

    const stateUser = async(userLogin) =>{
        await updateDoc(doc(db,"usuarios",userLogin.user.uid),{
            isOnline: true
        })
    }

    // Verificar login
    useEffect(() => {                       //El useEffect ejecuta algo apenas carga el componente
        onAuthStateChanged(auth, currentUser => {       //Si esta logeado devuelve el objeto entero, sino null
            setUser(currentUser);
            setLoading(false)
        })
        
    }, [])
    return (
        <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle, resetPassword, saveUser, stateUser }}>{children}</authContext.Provider>
    );
    //Exportar objetos
}
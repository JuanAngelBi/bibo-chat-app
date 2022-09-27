import { setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
export const documentUserDB = async (userLogin) =>{
    console.log(userLogin)
    if (!userLogin) return
    await setDoc(doc(db,"usuarios",userLogin.user.uid),{
      uid: userLogin.user.uid,
      displayName: userLogin.user.displayName,
      email:userLogin.user.email,
      photoURL:userLogin.user.photoURL,
      isOnline: false
    }) 
  }
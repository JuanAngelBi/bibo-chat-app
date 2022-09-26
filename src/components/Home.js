import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { db, auth,  } from "../services/firebase";
import { collection, query, where, onSnapshot, CollectionReference } from "firebase/firestore";


export function Home() {
    const {user, logout, loading} = useAuth()
    console.log(user)

    //Logout
    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    //useEffect(() => {
        //const userRef = collection(db, 'users')
        //create query object
        //const q = query()
    //}, [])

    if (loading == true) return <h1>Loading</h1>
    return <div>

        <h1>Welcome, {user.email}!</h1>

        <button onClick={handleLogout}>
            logout
        </button>

    </div>;
}
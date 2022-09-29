import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import User from "../components/User";
import MessageForm from "../components/MessageForm";

export function Home() {
    const [users, setUsers] = useState([])
    const { user, logout, loading } = useAuth()
    const [chat, setChat] = useState("")
    //Logout
    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        //Crea la coleccion en la base de datos
        const userRef = collection(db, "usuarios")
        //crea el query (contenedor) con el where condition
        const q = query(userRef, where("uid", "not-in", [user.uid]))
        //Ejecuta el snapshot
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = []
            querySnapshot.forEach((doc) => {
                users.push(doc.data())
            })
            setUsers(users);
        })
        return () => unsub();
    }, [user.uid]);
    // console.log(users)

    const selectUser = (user) => {
        setChat(user)
        console.log(user)
    };
    if (loading === true) return <h1>Loading</h1>

    return (
        // Todo el home
        <div className="w-full">
            {/* Header */}
            <div>
                <nav className="navbar navbar-expand-lg py-1 px-2 border-2 border-black bg-gray-400">
                    <div className="container-fluid">
                        <a className="navbar-brand bg-gray-100 hover:bg-gray-300 text-black text-sm font-bold py-1 px-2 border-2 border-gray-600 rounded fokus:outline-none fokus:shadow-outline" href="/">Chat's App</a>
                        <div className="justify-content-end" id="navbarNav">
                            <button className="bg-gray-100 hover:bg-gray-300 text-black text-sm font-bold py-1 px-2 border-2 border-gray-600 rounded fokus:outline-none fokus:shadow-outline" onClick={handleLogout}>Cerrar sesion</button>
                        </div>
                    </div>
                </nav>
            </div>
            {/* Chats */}
            <div className="flex">
                <div className="w-80 h-screen border-r-2 border-b-2 border-l-2 border-black bg-gray-200 overflow-y-auto" name="users_container">
                    {users.map(user => <User key={user.uid} user={user} selectUser={selectUser} />)}
                </div>
                {/* Mapea el contenedor de mensajeria */}
                <div className="flex-grow h-screen border-r-2 border-b-2 border-black bg-white" name="messages_container">
                    {chat ? (
                        <>
                            <div className="text-xl text-color-black text-center font-bold border-b-2 border-black" name="messages_user">
                                <h3>{chat.displayName || chat.email}</h3>
                            </div>
                            <MessageForm/>
                        </>
                    ) : (
                        <h3 className="text-xl text-color-black text-center font-bold border-b-2 border-black" name="no_conv">Select a user to start conversation</h3>
                    )}
                </div>
            </div>
        </div>
    )
}
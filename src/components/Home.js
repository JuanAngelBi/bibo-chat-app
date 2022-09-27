import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import User from "../components/User";

export function Home() {
    const [users, setUsers] = useState([])
    const { user, logout } = useAuth()
    //const [chat, setChat] = useState("");
    //const [text, setText] = useState("");
    //const [msgs, setMsgs] = useState([]);


    //const user1 = user.uid
    //const user2 = chat.uid
    //const idChat = user1 > user2 ? `${user1 + user2}` : `${user2+user1}`

    //Logout
    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const userRef = collection(db, "usuarios")
        const q = query(userRef, where("uid", "not-in", [user.uid]))
        const onsub = onSnapshot(q, (querySnapshot) => {
            let lstUsers = []
            querySnapshot.forEach((doc) => {
                lstUsers.push(doc.data())
                //console.log(lstUser)
            })
            setUsers(lstUsers)
        })
        return () => onsub()
    }, [user.uid])
    //const selectUser = (user) =>{
    //    setChat(user)

    //    const user2 = user.uid
    //    const idChat = user1 > user2 ? `${user1 + user2}` : `${user2+user1}`
    //    const msgsRef = collection(db,"messages",idChat,"chat")
    //    const q = query(msgsRef,orderBy("createdAt","asc"))
    //    onSnapshot(q,querySnapshot =>{
    //        let msgs = []
    //        querySnapshot.forEach(doc =>{
    //            msgs.push(doc.data())
    //        })
    //    setMsgs(msgs)
    //    })
    //} 


    //const handleSumbit = async(e) =>{
    //    e.preventDefault()
    //    await addDoc(collection(db,"messages",idChat,"chat"),{
    //        text,
    //        from:user1,
    //        to:user2,
    //        createdAt: Timestamp.fromDate(new Date())},
    //    setText(""))
    //}

    //if (loading === true) return <h1>Loading</h1>

    return <section className="container h-screen flex overflow-hidden">
            <div className="bg-white w-4/12 p-6">
                <h3 className="text-sm text-center mb-8">Chat en Línea</h3>
            </div>
            <div className="bg-gray-100 w-screen"></div>
    </section>
    {/* {users.map(users => <User key={user.uid} user={user} />)} */ }

    {/* <h1>Welcome, {user.email}!</h1>

            <button onClick={handleLogout}>
                logout
            </button> */}

}
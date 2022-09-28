import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "../assets/media/App.css"
import User from "../components/User";
import Header from "../components/header";

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

    return (
        <div class="flex">
            <div class="w-14 h-screen flex flex-col bg-white"></div>
            <div class="w-60 h-screen bg-gray-100">
                <div class="text-xl p-3">Chats</div>
                <div class="p-3 flex">
                    <input
                        type="text"
                        class="p-2 w-10/12 bg-gray-200"
                        placeholder="Search for messages or users ..." />
                    <div class="w-2/12 flex justify-center items-center bg-gray-200">
                        <img src="../assets/media/static/search.png" />
                    </div>
                </div>
            </div>
            <div class="flex-grow h-screen bg-green-100"></div>
        </div>
        // <div>
        //     <div>
        //         <Header></Header>
        //     </div>
        //     <div>
        //         <div className="home_container">
        //             <div className="users_container"></div>
        //         </div>
        //     </div>
        // </div>
    )
    { users.map(user => <User key={user.uid} user={user} />) }

    {/* <Header></Header>
                <div className="home_container">
                    <div className="users_container">
                    </div>
                </div> */}

    // return (
    //     <h>
    //         <h1>Welcome, {user.email}</h1>
    //         <button onClick={handleLogout}>Logout</button>
    //     </h>
    // )

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

    // return <section className="container h-screen flex overflow-hidden">
    //         <div className="bg-white w-4/12 p-6">
    //             <h3 className="text-sm text-center mb-8">Chat en Línea</h3>
    //         </div>
    //         <div className="bg-gray-100 w-screen"></div>
    // </section>

    {/* {users.map(users => <User key={user.uid} user={user} />)} */ }

}
import { useAuth } from "../context/authContext";

export function Home() {
    const {user, logout, loading} = useAuth()

    console.log(user)

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
        //Para saber si es ascincrono o no, ir a la funcion de signOut. Si dice Promise es asincrono
        //Asincrono quiere decir que toma algo de tiempo
    }

    if (loading == true) return <h1>Loading</h1>
    return <div>

        <h1>Welcome, {user.email}!</h1>

        <button onClick={handleLogout}>
            logout
        </button>

    </div>;
}
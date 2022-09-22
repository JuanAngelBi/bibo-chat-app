import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({children}) {
//Comprobar si el objeto usuario existe, sino va al login. Si existe pinto el elemento
    const {user, loading} = useAuth()

    if (loading) return <h1>Loading</h1>

    if (!user) return <Navigate to='/login' />

    return <>{children}</>        //Si tiene usuario, retornar los elementos
}
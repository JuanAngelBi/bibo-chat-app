import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { documentUserDB } from "../services/writeDB";

export function Register() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const { signup } = useAuth()                                    //Registrar usuario. De ese objeto, quiero extraer el signup
    const navigate = useNavigate()                                  //Herramienta de RRD para navegar en las rutas
    const [error, setError] = useState()                            //Error

    const handleChange = ({ target: { name, value } }) =>           //Actualizar estado
        setUser({ ...user, [name]: value })                         //Copia los datos que tenga el usuario en el momento y luego actualiza

    const handleSubmit = async e => {                               //Ver lo que tiene el estado
        e.preventDefault()
        setError('')
        console.log(user)
        try {
            const userRegister = await signup(user.email, user.password)
            navigate('/')
            console.log(userRegister)
            documentUserDB(userRegister)        //enviar el usuario a firestore
        } catch (error) {
            console.log(error.code)
            setError(error.message)
        }
    }
    //Por el async-await significa que es asincrono

    return (
        <div className="w-full max-w-xs m-auto">

            {error && <Alert message={error} />}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold my-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="youremail@company.ltd"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 loading-tight fokus:outline-none fokus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold my-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        placeholder="******"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 loading-tight fokus:outline-none fokus:shadow-outline"
                    />
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded fokus:outline-none fokus:shadow-outline">Register</button>
            </form>

            <p className="my-4 text-sm flex justify-between px-3">Already have an Account? <Link to='/login' className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded fokus:outline-none fokus:shadow-outline">Login</Link></p>

        </div>
    )
}
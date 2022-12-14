import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Login() {

    const [user, setUser] = useState({                      //Estado usuario
        email: '',
        password: '',
    });
    const { login, loginWithGoogle, resetPassword, saveUser, stateUser } = useAuth()              //Auth                
    const navigate = useNavigate()                          //Navigate
    const [error, setError] = useState()                    //Error

    const handleChange = ({ target: { name, value } }) =>       //Actualizar estado
        setUser({ ...user, [name]: value })

    const handleSubmit = async e => {                           //Envio de los datos
        e.preventDefault()
        setError('')
        try {
            const userLogged = await login(user.email, user.password)
            stateUser(userLogged)
            navigate('/')
        } catch (error) {
            setError(error.code)
            if(error.code === "auth/wrong-password"){
                setError("Incorrect Password")
            } else if(error.code === "auth/user-not-found"){
                setError("User don't found")
            } else if( (error.code === "auth/invalid-email")){
                setError("Invalid email")
            }
        }
    }

    const handleResetPassword = async () => {                           //Restaurar contraseña
        if (!user.email) return setError("Please enter your email");

        try {
            await resetPassword(user.email)
            setError("Verify your email")
        } catch (error) {
            setError(error.message)
        }
    }

    const handleGoogleSignIn = async () => {                            //Manejo del logeo con google
        try {
            const userLoggedGoogle = await loginWithGoogle()
            saveUser(userLoggedGoogle)
            stateUser(userLoggedGoogle)
            navigate('/')
            
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="w-full max-w-xs m-auto">

            {error && <Alert message={error} />}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="youremail@company.ltd"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 loading-tight fokus:outline-none fokus:shadow-outline"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        placeholder="******"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 loading-tight fokus:outline-none fokus:shadow-outline"

                    />
                </div>

                <div className="flex items-center justify-between">
                    <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded fokus:outline-none fokus:shadow-outline">Login</button>
                    <a 
                        href="#!" 
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" 
                        onClick={handleResetPassword}
                        >Forgot password?</a>
                </div>
            </form>

            <p className="my-4 text-sm flex justify-between px-3">Don't have an Account? <Link to='/register' className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded fokus:outline-none fokus:shadow-outline">Register</Link></p>

            <button onClick={handleGoogleSignIn} className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full">Google Login</button>

        </div>
    )
}
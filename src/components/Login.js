import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Login() {

    const [user, setUser] = useState({                      //Estado usuario
        email:'',
        password:'',
    });
    const {login, loginWithGoogle} = useAuth()              //Auth                
    const navigate = useNavigate()                          //Navigate
    const [error, setError] = useState()                    //Error

    const handleChange = ({target: {name, value}}) =>       //Actualizar estado
        setUser({...user, [name]: value})

    const handleSubmit = async e => { 
        e.preventDefault()
        setError('')
        try {
            await login(user.email, user.password)
            navigate('/')
        } catch (error) {
            console.log(error.code)
            setError(error.message)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle()
            navigate('/')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
        
        {error && <Alert message={error}/>}

            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="youremail@company.ltd"
                    onChange={handleChange}    
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    onChange={handleChange}
                    placeholder="******"
                />

                <button>Login</button>
            </form>

            <button onClick={handleGoogleSignIn}>Google Login</button>

        </div>
    )
}
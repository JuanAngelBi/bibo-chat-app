import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Register() {

    const [user, setUser] = useState({
        email:'',
        password:'',
    });
    const {signup} = useAuth()          //Registrar usuario. De ese objeto, quiero extraer el signup
    const navigate = useNavigate()      //Herramienta de RRD para navegar en las rutas
    const [error, setError] = useState()    //Error

    const handleChange = ({target: {name, value}}) =>       //Actualizar estado
        setUser({...user, [name]: value})    //Copia los datos que tenga el usuario en el momento y luego actualiza

    const handleSubmit = async e => {                             //Ver lo que tiene el estado
        e.preventDefault()  //Para que no refresque la pagina
        setError('')        //setError en blanco antes de registrar
        try {                                   //Si se ejecutó signup sin ningun error, se va al Home
            await signup(user.email, user.password)   //Ejecutar signup
            navigate('/')                       //Envia a la ruta inicial
        } catch (error) {
            console.log(error.code)
            setError(error.message)
        }
    }
    //Por el async-await significa que es asincrono

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

                <button>Register</button>
            </form>

        </div>
    )
}
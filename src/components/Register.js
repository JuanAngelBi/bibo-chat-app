import { useState } from "react";
import { useAuth } from "../context/authContext";

export function Register() {

    const [user, setUser] = useState({
        email:'',
        password:'',
    });
    const {signup} = useAuth()

    const handleChange = ({target: {name, value}}) =>       //Actualizar estado
        setUser({...user, [name]: value})    //Copia los datos que tenga el usuario en el momento y luego actualiza

    const handleSubmit = e => {                             //Ver lo que tiene el estado
        e.preventDefault()  //Para que no refresque la pagina
        signup(user.email, user.password)
    }

    return (
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
            />

            <button>Register</button>
        </form>
    )
}
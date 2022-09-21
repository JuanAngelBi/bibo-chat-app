import { useState } from "react"

export function Login() {

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    return (
        <form>
            <label htmlFor="email">Ingrese email</label>
            <input 
                type="email" 
                name="email" 
                placeholder="youremail@company.ltd"   
            />
            <label htmlFor="password">Ingrese password</label>
            <input 
                type="password" 
                name="password" 
                id="password"
            />
            <button>Login</button>
        </form>
    )
}
import { useState } from 'react';
import axios from 'axios';
import './login.css';
import ClipLoader from "react-spinners/ClipLoader";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    console.log(isLoading);
    function handleLogin(e) {
        e.preventDefault();
        const emailError = document.querySelector('.email.error')
        const passwordError = document.querySelector('.password.error')

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password
            }
        })
        .then(() => {
            setIsLoading(true)
            window.location = '/home'
        })
        .catch((err) => {
            emailError.innerHTML = err.response.data.errors.email
            passwordError.innerHTML = err.response.data.errors.password
        })

        setIsLoading(false)
    }

    return (
        <div className='login-ctn'>
            {isLoading && (
                <div className="spinner">
                    <ClipLoader
                        color='#000'
                        loading={isLoading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <h2>En cours de chargement...</h2>
                </div>
            )}
            <div className='login-welcome'>
                <h1>Gestion de stock</h1>
                <h2>AnaMarCol</h2>
            </div>
            <form className='login-logs' action='' onSubmit={handleLogin} id="sign-up-form">
                <label htmlFor='email'>E-mail</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"  
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='exemple@gmail.com' 
                    required 
                />
                <div className='email error'></div>
                <label htmlFor='password'>Mot de passe</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"  
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder='*******' 
                    autoComplete=''
                    required 
                />
                <div className='password error'></div>
                <input type="submit" value='Se connecter' className='form-btn' />
            </form>
        </div>
    )
}
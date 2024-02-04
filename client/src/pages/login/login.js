import './login.css';
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className='login-ctn'>
            <div className='login-welcome'>
                <h1>Gestion de stock</h1>
                <h2>AnaMarCol</h2>
            </div>
            <form className='login-logs'>
                <label>E-mail</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"  
                    placeholder='exemple@gmail.com' 
                    // required 
                />
                <label>Mot de passe</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"  
                    placeholder='*******' 
                    autoComplete=''
                    // required 
                />
                <button type="submit" value='submit'>
                    <Link to='/home'>Se connecter</Link>
                </button>
            </form>
        </div>
    )
}
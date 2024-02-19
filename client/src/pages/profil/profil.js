import './profil.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';
import { UidContext } from '../../components/AppContext';
import { useContext } from 'react';
import UpdateProfil from '../../components/Profil/UpdateProfil';

export default function Articles() {
    const uid = useContext(UidContext)

    return (
        <div>
            {uid ? (
                <div>
                    <Header />
                    <div className='profil-flex'>
                        <Menu />
                        <UpdateProfil />
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Veuillez vous connecter</h1>
                    <h2><Link to='/'>Retour à la page de connexion</Link></h2>
                </div>
            )}
        </div>
    )
}
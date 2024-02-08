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
                <h2>Vous n'êtes pas connecté.</h2>
            )}
        </div>
    )
}
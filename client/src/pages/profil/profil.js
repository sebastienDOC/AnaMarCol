import './profil.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';
import { UidContext } from '../../components/AppContext';
import { useContext } from 'react';

export default function Articles() {
    const uid = useContext(UidContext)

    return (
        <div>
            {uid ? (
                <div>
                    <Header />
                    <Menu />
                    <h2>UPDATE PAGE</h2>
                </div>
            ) : (
                <h2>Vous n'êtes pas connecté.</h2>
            )}
        </div>
    )
}
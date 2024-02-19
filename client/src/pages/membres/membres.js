import './membres.css'
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { UidContext } from '../../components/AppContext';

export default function Membres() {
    const usersData = useSelector((state) => state.usersReducer)
    const uid = useContext(UidContext)

    return (
        <div>
            {uid ? (
                <div>
                    <Header />
                    <div className='membres-ctn'>
                        <Menu />
                        <div className='membres-flex'>
                            <div className='membres-chef'>
                                <div className='membres-adresse'>
                                    <ul className='all-membres'>
                                        {usersData.map((user, index) => (
                                            <li key={user._id} className={index === 0 ? 'first-membres' : ''}>
                                                <h2>{user.poste}</h2>
                                                <img 
                                                    src={user.picture}
                                                    alt="Employé"
                                                    className='user-img'
                                                />
                                                <h3>{user.pseudo}</h3>
                                                <p>{user.numero}</p>
                                                <p>{user.email}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            ) : 
                <div>
                    <h1>Veuillez vous connecter</h1>
                    <h2><Link to='/'>Retour à la page de connexion</Link></h2>
                </div>
            }
        </div>
    )
}        
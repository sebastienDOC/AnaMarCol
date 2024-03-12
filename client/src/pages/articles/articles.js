import './articles.css'
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';
import { useContext } from 'react';
import { UidContext } from '../../components/AppContext';

export default function Articles() {
    const uid = useContext(UidContext)

    return (
        <div>
          {uid ? (
            <div>
              <Header />
              <div className='articles-ctn'>
                <Menu />
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
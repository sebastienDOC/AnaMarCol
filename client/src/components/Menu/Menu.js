import './Menu.css';

import { Link } from 'react-router-dom'

export default function Menu() {
    
    return (
        <div className='menu-ctn'>
            <ul className='menu-list'>
                <Link to='/home'>
                    <li>
                        <i className="fa-solid fa-house"></i>
                        Tableau de bord
                    </li>
                </Link>
                <Link to='/articles'>
                    <li>
                        <i className="fa-solid fa-bag-shopping"></i>
                        Articles
                    </li>
                </Link>
                <Link to='/commandes'>
                    <li>
                        <i className="fa-solid fa-clipboard"></i>
                        Commandes
                    </li>
                </Link>
                <Link to='/contacts'>
                    <li>
                        <i className="fa-solid fa-user"></i>
                        Contacts
                    </li>
                </Link>
            </ul>
        </div>
    )
}
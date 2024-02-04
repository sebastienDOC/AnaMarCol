import './Header.css';
import Menu from '../Menu/Menu';
import { useState } from 'react';
import Logo from '../../assets/Logo/logo_small.jpg'
import { Link } from 'react-router-dom';

export default function Header() {
    // const [open, setOpen] = useState(false);

    // const handleOpen = () => {
    //     setOpen(!open);
    // };

    return (
        <div className='header'>
            <div className='header-menu'>
                {/* {open ? 
                    <div>
                        <button onClick={handleOpen} className='header-btn'>
                            <img 
                                src={Logo}
                                alt='Logo AnaMarCol'
                                className='header-logo'
                            />
                            <i className="fa-solid fa-chevron-up"></i>
                        </button>
                        <Menu />
                        <button className='menu-close' onClick={handleOpen}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    </div> 
                : 
                    <button onClick={handleOpen} className='header-btn'>
                        <img 
                            src={Logo}
                            alt='Logo AnaMarCol'
                            className='header-logo'
                            />
                        <i className="fa-solid fa-chevron-down"></i>
                    </button>
                */}
                
                <div className='header-btn'>
                    <img 
                        src={Logo}
                        alt='Logo AnaMarCol'
                        className='header-logo'
                    />
                </div>
            </div>

            <div className='header-tools'>
                <input 
                    type='search' 
                    className='header-search'
                    placeholder='Recherche' 
                />

                <div className='header-icons'>
                    <Link to='/profil'>
                        <i className="fa-solid fa-user fa-xl"></i>
                    </Link>
                    <Link to='/'>
                        <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}
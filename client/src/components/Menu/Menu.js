import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddModal from '../Modales/AddModale';
import './Menu.css';
import { useSelector } from 'react-redux';

export default function Menu() {
  const location = useLocation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const currentUser = useSelector((state) => state.userReducer)

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const isOnArticlePage = location.pathname === '/articles';

  return (
    <div className='menu-ctn'>
      <ul className='menu-list'>
        <li>
          <Link to='/home'>
            <i className="fa-solid fa-house"></i>
            Tableau de bord
          </Link>
        </li>

        {isOnArticlePage && (
          <> 
            <li>
              <Link to='/articles'>
                <i className="fa-solid fa-bag-shopping"></i>
                Articles
              </Link>
            </li>
          
            <li className='li-btn'>
              <button onClick={openAddModal}>Ajouter article(s)</button>
            </li>
          </>
        )}
        {!isOnArticlePage && (
          
            <li>
              <Link to='/articles'>
                <i className="fa-solid fa-bag-shopping"></i>
                Articles
              </Link>
            </li>
          
        )}      
        <li>
          <Link to='/membres'>
            <i className="fa-solid fa-user"></i>
            Membres
          </Link>
        </li>     
        <li>
          <Link to='/contacts'>
            <i className="fa-solid fa-user"></i>
            Contacts
          </Link>
        </li>       
      </ul>

      {isAddModalOpen && currentUser._id && <AddModal onClose={closeAddModal} posterId={currentUser._id} modifierId={currentUser._id}/>}
      
    </div>
  );
}

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
        <Link to='/home'>
          <li>
            <i className="fa-solid fa-house"></i>
            Tableau de bord
          </li>
        </Link>
        {isOnArticlePage && (
          <>
            <Link to='/articles'>
              <li>
                <i className="fa-solid fa-bag-shopping"></i>
                Articles
              </li>
            </Link>
              <li className='li-btn'>
                <button onClick={openAddModal}>Ajouter article(s)</button>
              </li>
          </>
        )}
        {!isOnArticlePage && (
          <Link to='/articles'>
            <li>
              <i className="fa-solid fa-bag-shopping"></i>
              Articles
            </li>
          </Link>
        )}
        <Link to='/contacts'>
          <li>
            <i className="fa-solid fa-user"></i>
            Contacts
          </li>
        </Link>
      </ul>

      {isAddModalOpen && currentUser._id && <AddModal onClose={closeAddModal} posterId={currentUser._id} modifierId={currentUser._id}/>}
      
    </div>
  );
}

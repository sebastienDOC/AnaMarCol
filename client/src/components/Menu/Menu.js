import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddModal from '../Modales/AddModale';
import DeleteModal from '../Modales/DeleteModale';
import './Menu.css';

export default function Menu() {
  const location = useLocation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
            <ul>
              <li className='li-btn'>
                <button onClick={openAddModal}>Ajouter article(s)</button>
              </li>
              <li className='li-btn'>
                <button onClick={openDeleteModal}>Supprimer article(s)</button>
              </li>
            </ul>
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

      {isAddModalOpen && <AddModal onClose={closeAddModal} />}
      {isDeleteModalOpen && <DeleteModal onClose={closeDeleteModal} />}
    </div>
  );
}

import React from 'react';

const DeleteItem = ({ onDelete }) => {
    return (
      <button onClick={(e) => {
        e.stopPropagation()
        if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
          onDelete();
        }
      }} className="item-del">
        <i className="fa-solid fa-trash"></i>
      </button>
    );
  };
  
  
export default DeleteItem

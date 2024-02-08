// DeleteModal.jsx
import React from 'react';

const DeleteModal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <p>Contenu de la modale de suppression</p>
      <button onClick={onClose}>Fermer</button>
    </div>
  </div>
);

export default DeleteModal;

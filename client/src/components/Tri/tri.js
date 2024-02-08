// FiltreArticles.js
import React, { useState, useEffect } from 'react';
import './Tri.css'

const FiltreArticles = ({ onFilterChange }) => {
  const [sortByFournisseur, setSortByFournisseur] = useState('');
  const [sortByEtat, setSortByEtat] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filters = { sortByFournisseur, sortByEtat, searchTerm };
    onFilterChange(filters);
  }, [sortByFournisseur, sortByEtat, searchTerm]);

  return (
    <div className='tri-ctn'>
        <h4>Filtrer par fournisseur :</h4>
        <select onChange={(e) => setSortByFournisseur(e.target.value)}>
            <option value="">Tous les fournisseurs</option>
            <option value="Aures">Aures</option>
            <option value="CashGuard">CashGuard</option>
            <option value="LDLC">LDLC</option>
            <option value="VNE">VNE</option>
        </select>

        <h4>Filtrer par état :</h4>
        <select onChange={(e) => setSortByEtat(e.target.value)}>
            <option value="">Tous les états</option>
            <option value="Neuf">Neuf</option>
            <option value="SAV">SAV</option>
        </select>

        <h4>Rechercher par dénomination :</h4>
        <input
            type="text"
            placeholder="Rechercher..."
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
  );
};

export default FiltreArticles;
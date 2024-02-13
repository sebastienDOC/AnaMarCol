import React, { useState, useEffect } from 'react';
import './Tri.css'

const FiltreArticles = ({ onFilterChange }) => {
  const [selectedFournisseurs, setSelectedFournisseurs] = useState([]);
  const [selectedEtats, setSelectedEtats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filters = { selectedFournisseurs, selectedEtats, searchTerm };

    onFilterChange(filters);
  }, [selectedFournisseurs, selectedEtats, searchTerm]);

  const handleFournisseurChange = (value) => {
    const updatedFournisseurs = selectedFournisseurs.includes(value)
      ? selectedFournisseurs.filter((f) => f !== value)
      : [...selectedFournisseurs, value];

    setSelectedFournisseurs(updatedFournisseurs);
  };

  const handleEtatChange = (value) => {
    const updatedEtats = selectedEtats.includes(value)
      ? selectedEtats.filter((e) => e !== value)
      : [...selectedEtats, value];

    setSelectedEtats(updatedEtats);
  };

  return (
    <div className='tri-ctn'>
      
      <div className='tri-recherche'>
        <h4>Rechercher :</h4>
        <input
          type="text"
          placeholder="Rechercher..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='tri-fournisseur'>
        <h4>Fournisseur :</h4>
        {['CashGuard', 'Aures', 'LDLC', 'Monétique et Services', 'Oxhoo', 'VNE', 'MD Ouest', 'Solumag', 'Tigra'].map(value => (
          <label key={value}>
            <input type="checkbox" value={value} checked={selectedFournisseurs.includes(value)} onChange={() => handleFournisseurChange(value)} />
            {value}
          </label>
        ))}
      </div>

      <div className='tri-etat'>
        <h4>État :</h4>
        {['SAV', 'Neuf'].map(value => (
          <label key={value}>
            <input type="checkbox" value={value} checked={selectedEtats.includes(value)} onChange={() => handleEtatChange(value)} />
            {value}
          </label>
        ))}
      </div>

    </div>
  );
};

export default FiltreArticles;

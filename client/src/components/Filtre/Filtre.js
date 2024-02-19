import React, { useState, useCallback } from 'react';
import './Filtre.css';

const FiltreArticles = ({ onFilterChange }) => {
  const [selectedFournisseurs, setSelectedFournisseurs] = useState([]);
  const [selectedEtats, setSelectedEtats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFournisseurChange = useCallback(
    (value) => {
      const updatedFournisseurs = selectedFournisseurs.includes(value)
        ? selectedFournisseurs.filter((f) => f !== value)
        : [...selectedFournisseurs, value];

      setSelectedFournisseurs(updatedFournisseurs);
      onFilterChange({ selectedFournisseurs: updatedFournisseurs, selectedEtats, searchTerm });
    },
    [selectedFournisseurs, selectedEtats, searchTerm, onFilterChange]
  );

  const handleEtatChange = useCallback(
    (value) => {
      const updatedEtats = selectedEtats.includes(value)
        ? selectedEtats.filter((e) => e !== value)
        : [...selectedEtats, value];

      setSelectedEtats(updatedEtats);
      onFilterChange({ selectedFournisseurs, selectedEtats: updatedEtats, searchTerm });
    },
    [selectedFournisseurs, selectedEtats, searchTerm, onFilterChange]
  );

  const handleSearchTermChange = useCallback(
    (value) => {
      setSearchTerm(value);
      onFilterChange({ selectedFournisseurs, selectedEtats, searchTerm: value });
    },
    [selectedFournisseurs, selectedEtats, onFilterChange]
  );

  return (
    <div className='tri-ctn'>
      
      <div className='tri-recherche'>
        <h4>Rechercher :</h4>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm} 
          onChange={(e) => handleSearchTermChange(e.target.value)}
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

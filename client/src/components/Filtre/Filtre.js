import React, { useState, useCallback } from 'react';
import './Filtre.css';

const FiltreArticles = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    selectedFournisseurs: '',
    selectedEtats: '',
    searchTerm: ''
  });
  const [selectedFournisseurs, setSelectedFournisseurs] = useState([]);
  const [selectedEtats, setSelectedEtats] = useState([]);

  const handleFournisseursChangeDesk = useCallback(
    (value) => {
      const updatedFournisseurs = selectedFournisseurs.includes(value)
        ? selectedFournisseurs.filter((f) => f !== value)
        : [...selectedFournisseurs, value];

      setSelectedFournisseurs(updatedFournisseurs);
      onFilterChange({ selectedFournisseurs: updatedFournisseurs, selectedEtats, searchTerm: filters.searchTerm });
    },
    [selectedFournisseurs, selectedEtats, filters.searchTerm, onFilterChange]
  );

  const handleEtatsChangeDesk = useCallback(
    (value) => {
      const updatedEtats = selectedEtats.includes(value)
        ? selectedEtats.filter((e) => e !== value)
        : [...selectedEtats, value];

      setSelectedEtats(updatedEtats);
      onFilterChange({ selectedFournisseurs, selectedEtats: updatedEtats, searchTerm: filters.searchTerm });
    },
    [selectedFournisseurs, selectedEtats, filters.searchTerm, onFilterChange]
  );


  const handleFournisseursChange = useCallback(
    (event) => {
      const value = event.target.value;
      setFilters({ ...filters, selectedFournisseurs: value });
      onFilterChange({ selectedFournisseurs: value, selectedEtats: filters.selectedEtats, searchTerm: filters.searchTerm });
    },
    [filters, onFilterChange]
  );

  const handleEtatsChange = useCallback(
    (event) => {
      const value = event.target.value;
      setFilters({ ...filters, selectedEtats: value });
      onFilterChange({ selectedFournisseurs: filters.selectedFournisseurs, selectedEtats: value, searchTerm: filters.searchTerm });
    },
    [filters, onFilterChange]
  );

  const handleSearchTermChange = useCallback(
    (event) => {
      const value = event.target.value;
      setFilters({ ...filters, searchTerm: value });
      onFilterChange({ selectedFournisseurs: filters.selectedFournisseurs, selectedEtats: filters.selectedEtats, searchTerm: value });
    },
    [filters, onFilterChange]
  );

  return (
    <div className='filtres'>
      <div className='tri-ctn desk'>

        <h4>Rechercher :</h4>
        <div className='tri-recherche'>
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>

        <h4>Fournisseur :</h4>
        <div className='tri-fournisseur'>
          {['CashGuard', 'Aures', 'LDLC', 'Monétique et Services', 'Oxhoo', 'VNE', 'MD Ouest', 'Solumag', 'Tigra'].map(value => (
            <label key={value}>
              <input type="checkbox" value={value} checked={selectedFournisseurs.includes(value)} onChange={() => handleFournisseursChangeDesk(value)} />
              {value}
            </label>
          ))}
        </div>

        <h4>État :</h4>
        <div className='tri-etat'>  
          {['SAV', 'Neuf'].map(value => (
            <label key={value}>
              <input type="checkbox" value={value} checked={selectedEtats.includes(value)} onChange={() => handleEtatsChangeDesk(value)} />
              {value}
            </label>
          ))}
        </div>

      </div>

      <div className='tri-ctn mob'>
        <div className='tri-recherche'>
          <h4>Rechercher :</h4>
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>

        <div className='tri-fournisseur'>
          <h4>Fournisseur :</h4>
          <select value={filters.selectedFournisseurs} onChange={handleFournisseursChange}>
            <option value="">-- Fournisseur --</option>
            {['CashGuard', 'Aures', 'LDLC', 'Monétique et Services', 'Oxhoo', 'VNE', 'MD Ouest', 'Solumag', 'Tigra'].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div className='tri-etat'>  
          <h4>État :</h4>
          <select value={filters.selectedEtats} onChange={handleEtatsChange}>
            <option value="">-- État --</option>
            {['SAV', 'Neuf'].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltreArticles;

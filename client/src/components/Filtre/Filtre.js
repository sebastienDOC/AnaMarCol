import React, { useState, useCallback } from 'react';
import './Filtre.css';

const FiltreArticles = ({ setCurrentPage, onFilterChange }) => {
  const [filters, setFilters] = useState({
    selectedFournisseurs: '',
    // selectedEtats: '',
    searchTerm: '',
    selectedPrepaCG: false,
    selectedPrepaCaisse: false,
    selectedPrepaTPV: false,
    selectedPreparation: ''
  });
  const [selectedFournisseurs, setSelectedFournisseurs] = useState([]);
  // const [selectedEtats, setSelectedEtats] = useState([]);

  const handleFournisseursChangeDesk = useCallback(
    (value) => {
      const updatedFournisseurs = selectedFournisseurs.includes(value)
        ? selectedFournisseurs.filter((f) => f !== value)
        : [...selectedFournisseurs, value];
  
      setSelectedFournisseurs(updatedFournisseurs);
      onFilterChange({ selectedFournisseurs: updatedFournisseurs, searchTerm: filters.searchTerm, selectedPrepaCG: filters.selectedPrepaCG, selectedPrepaCaisse: filters.selectedPrepaCaisse, selectedPrepaTPV: filters.selectedPrepaTPV });
      setCurrentPage(1);
    },
    [selectedFournisseurs, filters.searchTerm, filters.selectedPrepaCG, filters.selectedPrepaCaisse, filters.selectedPrepaTPV, onFilterChange]
  );
  
  
  const handleFournisseursChange = useCallback(
    (event) => {
      const value = event.target.value;
      setFilters({ ...filters, selectedFournisseurs: value });
      onFilterChange({ selectedFournisseurs: value, searchTerm: filters.searchTerm, selectedPrepaCG: filters.selectedPrepaCG, selectedPrepaCaisse: filters.selectedPrepaCaisse, selectedPrepaTPV: filters.selectedPrepaTPV });
      setCurrentPage(1);
    },
    [filters, onFilterChange]
  );

    // const handleEtatsChangeDesk = useCallback(
  //   (value) => {
  //     const updatedEtats = selectedEtats.includes(value)
  //       ? selectedEtats.filter((e) => e !== value)
  //       : [...selectedEtats, value];

  //     setSelectedEtats(updatedEtats);
  //     onFilterChange({ selectedFournisseurs, selectedEtats: updatedEtats, searchTerm: filters.searchTerm });
  //   },
  //   [selectedFournisseurs, selectedEtats, filters.searchTerm, onFilterChange]
  // );

  // const handleEtatsChange = useCallback(
  //   (event) => {
  //     const value = event.target.value;
  //     setFilters({ ...filters, selectedEtats: value });
  //     onFilterChange({ selectedFournisseurs: filters.selectedFournisseurs, selectedEtats: value, searchTerm: filters.searchTerm });
  //   },
  //   [filters, onFilterChange]
  // );

  const handleSearchTermChange = useCallback(
    (event) => {
      const value = event.target.value;
      setFilters({ ...filters, searchTerm: value });
      onFilterChange({ selectedFournisseurs: filters.selectedFournisseurs, searchTerm: value, selectedPrepaCG: filters.selectedPrepaCG, selectedPrepaCaisse: filters.selectedPrepaCaisse, selectedPrepaTPV: filters.selectedPrepaTPV });
      setCurrentPage(1);
    },
    [filters, onFilterChange]
  );

  const handlePrepaCGChangeDesk = useCallback(() => {
    const updatedPrepaCG = !filters.selectedPrepaCG;
  
    setFilters({ ...filters, selectedPrepaCG: updatedPrepaCG });
    onFilterChange({ selectedFournisseurs, searchTerm: filters.searchTerm, selectedPrepaCG: updatedPrepaCG, selectedPrepaCaisse: filters.selectedPrepaCaisse, selectedPrepaTPV: filters.selectedPrepaTPV });
    setCurrentPage(1);
  }, [selectedFournisseurs, filters.selectedPrepaCG, filters.selectedPrepaCaisse, filters.selectedPrepaTPV, filters.searchTerm, onFilterChange]);
  
  const handlePrepaCaisseChangeDesk = useCallback(() => {
    const updatedPrepaCaisse = !filters.selectedPrepaCaisse;
  
    setFilters({ ...filters, selectedPrepaCaisse: updatedPrepaCaisse });
    onFilterChange({ selectedFournisseurs, searchTerm: filters.searchTerm, selectedPrepaCG: filters.selectedPrepaCG, selectedPrepaCaisse: updatedPrepaCaisse, selectedPrepaTPV: filters.selectedPrepaTPV });
    setCurrentPage(1);
  }, [selectedFournisseurs, filters.selectedPrepaCG, filters.selectedPrepaCaisse, filters.selectedPrepaTPV, filters.searchTerm, onFilterChange]);
  
  const handlePrepaTPVChangeDesk = useCallback(() => {
    const updatedPrepaTPV = !filters.selectedPrepaTPV;
  
    setFilters({ ...filters, selectedPrepaTPV: updatedPrepaTPV });
    onFilterChange({ selectedFournisseurs, searchTerm: filters.searchTerm, selectedPrepaCG: filters.selectedPrepaCG, selectedPrepaCaisse: filters.selectedPrepaCaisse, selectedPrepaTPV: updatedPrepaTPV });
    setCurrentPage(1);
  }, [selectedFournisseurs, filters.selectedPrepaCG, filters.selectedPrepaCaisse, filters.selectedPrepaTPV, filters.searchTerm, onFilterChange]);  
  
  const handlePreparationChange = useCallback(
    (event) => {
      const value = event.target.value;
      let updatedFilters = { ...filters, selectedPreparation: value };
  
      if (value === "CashGuard") {
        updatedFilters = { ...updatedFilters, selectedPrepaCG: true, selectedPrepaCaisse: false, selectedPrepaTPV: false };
      } else if (value === "Caisse OHXHOO") {
        updatedFilters = { ...updatedFilters, selectedPrepaCG: false, selectedPrepaCaisse: true, selectedPrepaTPV: false };
      } else if (value === "Caisse TPV") {
        updatedFilters = { ...updatedFilters, selectedPrepaCG: false, selectedPrepaCaisse: false, selectedPrepaTPV: true };
      } else {
        updatedFilters = { ...updatedFilters, selectedPrepaCG: false, selectedPrepaCaisse: false, selectedPrepaTPV: false };
      }
  
      setFilters(updatedFilters);
      onFilterChange(updatedFilters);
      setCurrentPage(1);
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
          {['CashGuard', 'Aures', 'LDLC', 'Monétique et Services', 'Oxhoo', 'VNE', 'TPV Line', 'MD Ouest', 'Solumag', 'Tigra'].map(value => (
            <label key={value}>
              <input type="checkbox" value={value} checked={selectedFournisseurs.includes(value)} onChange={() => handleFournisseursChangeDesk(value)} />
              {value}
            </label>
          ))}
        </div>

        {/* <h4>État :</h4>
        <div className='tri-etat'>  
          {['SAV', 'Neuf'].map(value => (
            <label key={value}>
              <input type="checkbox" value={value} checked={selectedEtats.includes(value)} onChange={() => handleEtatsChangeDesk(value)} />
              {value}
            </label>
          ))}
        </div> */}

        <h4>Préparation :</h4>
        <div className='tri-prepa'>
          <label>
            <input type="checkbox" checked={filters.prepaCG} onChange={handlePrepaCGChangeDesk} />
            CashGuard
          </label>
          <label>
            <input type="checkbox" checked={filters.prepaCaisse} onChange={handlePrepaCaisseChangeDesk} />
            Caisse OHXHOO
          </label>
          <label>
            <input type="checkbox" checked={filters.prepaTPV} onChange={handlePrepaTPVChangeDesk} />
            Caisse TPV
          </label>
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

        {/* <div className='tri-etat'>  
          <h4>État :</h4>
          <select value={filters.selectedEtats} onChange={handleEtatsChange}>
            <option value="">-- État --</option>
            {['SAV', 'Neuf'].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div> */}

        <div className='tri-prepa'>
          <h4>Préparation :</h4>
          <select value={filters.selectedPreparation} onChange={handlePreparationChange}>
            <option value="">-- Préparation --</option>
            <option value="CashGuard">CashGuard</option>
            <option value="Caisse OHXHOO">Caisse OHXHOO</option>
            <option value="Caisse TPV">Caisse TPV</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default FiltreArticles;

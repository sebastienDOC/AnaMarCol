import React, { useEffect, useState } from 'react';
import { useCollapse } from 'react-collapsed';
import './Collapse.css';
import { fetchEtatsList, fetchFournisseursList, fetchStatisticsForFournisseur, setFournisseurStatistics } from '../../actions/statistics.actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function Collapsible() {
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.statisticsReducer);
  const fournisseursList = statistics?.fournisseursList || [];
  const etatsList = statistics?.etatsList || [];
  const fournisseursStats = statistics?.fournisseursStats || {};

  useEffect(() => {
    dispatch(fetchFournisseursList());
    dispatch(fetchEtatsList());
  }, [dispatch]);

  const [expandedItems, setExpandedItems] = useState(new Array(fournisseursList.length + etatsList.length).fill(false));

  const handleToggle = async (index, fournisseur) => {
    setExpandedItems((prevExpandedItems) => {
      const newExpandedItems = [...prevExpandedItems];
      newExpandedItems[index] = !newExpandedItems[index];
      return newExpandedItems;
    });
  
    if (!fournisseursStats[fournisseur]) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/statistics/fournisseurs/${fournisseur}`);
        const data = response.data;
  
        console.log('Data for Fournisseur:', data); // Ajoutez ce journal pour voir les données récupérées
  
        dispatch(setFournisseurStatistics(data, fournisseur));
      } catch (error) {
        console.error(`Erreur lors de la récupération des statistiques pour le fournisseur ${fournisseur} :`, error);
      }
    }
  };
  

  return (
    <div>
      <div>
        <h3>Par Fournisseur</h3>
        <ul className='ul-fournisseurs'>
          {fournisseursList.map((fournisseur, index) => (
            <li key={index} className='li-fournisseur'>
              <button onClick={() => handleToggle(index, fournisseur)}>
                {fournisseur}
              </button>
              <div className={`collapse-content ${expandedItems[index] ? 'expanded' : ''}`}>
                {expandedItems[index] && (
                  <div>
                    <p>Nombre d'articles : {fournisseursStats[fournisseur]?.numberOfArticles || 0}</p>
                    <p>Stock total : {fournisseursStats[fournisseur]?.totalStock || 0}</p>
                    <p>Nombre d'articles avec un stock inférieur à 5 : {fournisseursStats[fournisseur]?.numberOfLowStockArticles || 0}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* ... Reste du code pour les États */}
    </div>
  );
}



{/* <div>
        <h3>Par État</h3>
        <ul className='ul-fournisseurs'>
          {etatsList.map((etat, index) => (
            <li key={index + fournisseursList.length} className='li-fournisseur'>
              <button onClick={() => handleToggle(index + fournisseursList.length)}>
                {etat}
              </button>
              <div className={`collapse-content ${expandedItems[index + fournisseursList.length] ? 'expanded' : ''}`}>
                {expandedItems[index + fournisseursList.length] && (
                  <div>
                    Utilisez les données réelles provenant du Redux store ici
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div> */}
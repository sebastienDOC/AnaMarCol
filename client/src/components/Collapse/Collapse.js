import React, { useEffect } from 'react';
import './Collapse.css';
import { fetchEtatsList, fetchFournisseursList, setFournisseurStatistics, setEtatStatistics } from '../../actions/statistics.actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function Collapsible() {
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.statisticsReducer);
  const fournisseursList = statistics?.fournisseursList
  const etatsList = statistics?.etatsList
  const fournisseursStats = statistics?.fournisseursStats
  const etatsStats = statistics?.etatsStats
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFournisseursList());
      await dispatch(fetchEtatsList());
    };
  
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchStatistics = async () => {
      for (const fournisseur of fournisseursList) {
        const responseFournisseur = await axios.get(`${process.env.REACT_APP_API_URL}api/statistics/fournisseurs/${fournisseur}`);
        const dataFournisseur = responseFournisseur.data;
        dispatch(setFournisseurStatistics(dataFournisseur, fournisseur));
      }

      for (const etat of etatsList) {
        const responseEtat = await axios.get(`${process.env.REACT_APP_API_URL}api/statistics/etats/${etat}`);
        const dataEtat = responseEtat.data;
        dispatch(setEtatStatistics(dataEtat, etat));
      }
    };

    fetchStatistics();
  }, [dispatch, fournisseursList, etatsList]);

  return (
    <div className='stats-container'>
      <div className='stats-etats'>
        <h3>Par État</h3>
        <ul className='ul-etats'>
          {etatsList.map((etat, index) => (
            <li key={index + fournisseursList.length} className='li-etats'>
              <h4>{etat}</h4>
              <p>Nombre d'articles : {etatsStats[etat]?.numberOfArticles || 0}</p>
              <p>Stock total : {etatsStats[etat]?.totalStock || 0}</p>
              <p>Nombre d'articles avec un stock inférieur à 5 : {etatsStats[etat]?.numberOfLowStockArticles || 0}</p>
            </li>
          ))}
        </ul>
      </div> 
      <div className='stats-fournisseurs'>
        <h3>Par Fournisseur</h3>
        <ul className='ul-fournisseurs'>
          {fournisseursList.map((fournisseur, index) => (
            <li key={index} className='li-fournisseur'>
              <h4>{fournisseur}</h4>
              <p>Nombre d'articles : {fournisseursStats[fournisseur]?.numberOfArticles || 0}</p>
              <p>Stock total : {fournisseursStats[fournisseur]?.totalStock || 0}</p>
              <p>Nombre d'articles avec un stock inférieur à 5 : {fournisseursStats[fournisseur]?.numberOfLowStockArticles || 0}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

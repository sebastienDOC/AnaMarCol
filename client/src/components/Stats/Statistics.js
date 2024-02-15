import React, { useEffect } from 'react';
import './Statistics.css';
import { useDispatch, useSelector } from 'react-redux';
import {fetchStatistics, fetchTotalStock, fetchNumberOfSuppliers, fetchNumberOfArticlesWithStockBelow5} from '../../actions/statistics.actions';
import { fetchEtatsList, fetchFournisseursList, setFournisseurStatistics, setEtatStatistics } from '../../actions/statistics.actions';
import axios from 'axios';

const Statistiques = () => {
  const dispatch = useDispatch();
  const globalStatistics = useSelector((state) => state.statisticsReducer.globalStatistics);

  const numberOfArticles = globalStatistics?.numberOfArticles || 0;
  const totalStock = globalStatistics?.totalStock || 0;
  const numberOfFournisseurs = globalStatistics?.numberOfSuppliers || 0;
  const numberOfArticlesStockInf5 = globalStatistics?.numberOfLowStockArticles || 0;

  const statistics = useSelector((state) => state.statisticsReducer);
  const fournisseursList = statistics?.fournisseursList
  const etatsList = statistics?.etatsList
  const fournisseursStats = statistics?.fournisseursStats
  const etatsStats = statistics?.etatsStats

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchStatistics());
        await dispatch(fetchTotalStock());
        await dispatch(fetchNumberOfSuppliers());
        await dispatch(fetchNumberOfArticlesWithStockBelow5());

        await dispatch(fetchFournisseursList());
        await dispatch(fetchEtatsList());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
    <div className='stats-ctn'>
  
        <div className='stats-container'>
            <div className='stats-total'>
                <h2>Stock Général</h2>
                <table>
                    <tbody>
                      <tr>
                        <th className='td-case'>Articles</th>
                        <th className='td-case'>Stock total</th>
                        <th className='td-case'>Fournisseurs</th>
                        <th className='td-case'>Stock &lt; 5</th>
                      </tr>
                      <tr className='tr-total'>
                          <td className='td-number'>{numberOfArticles}</td>
                          <td className='td-number'>{totalStock}</td>
                          <td className='td-number'>{numberOfFournisseurs}</td>
                          <td className='td-number'>{numberOfArticlesStockInf5}</td>
                      </tr>
                    </tbody>
                </table>
            </div>
  
            <div className='stats-etats'>
                <h2>Stock par État</h2>
                <table>
                    <tbody>
                      <tr>
                        <th>États</th>
                        <th className='td-case'>Articles</th>
                        <th className='td-case'>Stock total</th>
                        <th className='td-case'>Stock &lt; 5</th>
                      </tr>
                        {etatsList.map((etat, index) => (
                            <tr key={index + fournisseursList.length} className='tr-etats'>
                                <td className='td-etat'>{etat}</td>
                                <td className='td-number'>{etatsStats[etat]?.numberOfArticles || 0}</td>
                                <td className='td-number'>{etatsStats[etat]?.totalStock || 0}</td>
                                <td className='td-number'>{etatsStats[etat]?.numberOfLowStockArticles || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
  
        </div>
  
        <div className='stats-fournisseurs'>
            <h2>Stock par Fournisseur</h2>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Fournisseur</th>
                    <th className='td-case'>Articles</th>
                    <th className='td-case'>Stock total</th>
                    <th className='td-case'>Stock &lt; 5</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseursList.slice(0, Math.ceil(fournisseursList.length / 2)).map((fournisseur, index) => (
                    <tr key={index} className='tr-fournisseur'>
                      <td className='td-fournisseur'>{fournisseur}</td>
                      <td className='td-number'>{fournisseursStats[fournisseur]?.numberOfArticles || 0}</td>
                      <td className='td-number'>{fournisseursStats[fournisseur]?.totalStock || 0}</td>
                      <td className='td-number'>{fournisseursStats[fournisseur]?.numberOfLowStockArticles || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  
              <table>
                <thead>
                  <tr>
                    <th>Fournisseur</th>
                    <th className='td-case'>Articles</th>
                    <th className='td-case'>Stock total</th>
                    <th className='td-case'>Stock &lt; 5</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseursList.slice(Math.ceil(fournisseursList.length / 2)).map((fournisseur, index) => (
                    <tr key={index + Math.ceil(fournisseursList.length / 2)} className='tr-fournisseur'>
                      <td className='td-fournisseur'>{fournisseur}</td>
                      <td className='td-number'>{fournisseursStats[fournisseur]?.numberOfArticles || 0}</td>
                      <td className='td-number'>{fournisseursStats[fournisseur]?.totalStock || 0}</td>
                      <td className='td-number'>{fournisseursStats[fournisseur]?.numberOfLowStockArticles || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    </div>
  );
}

export default Statistiques;

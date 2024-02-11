import React, { useEffect } from 'react';
import './Statistics.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStatistics,
  fetchTotalStock,
  fetchNumberOfSuppliers,
  fetchNumberOfArticlesWithStockBelow5
} from '../../actions/statistics.actions';
import Collapsible from '../Collapse/Collapse';

const Statistiques = () => {
  const dispatch = useDispatch();
  const globalStatistics = useSelector((state) => state.statisticsReducer.globalStatistics);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchStatistics());
        await dispatch(fetchTotalStock());
        await dispatch(fetchNumberOfSuppliers());
        await dispatch(fetchNumberOfArticlesWithStockBelow5());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const numberOfArticles = globalStatistics?.numberOfArticles || 0;
  const totalStock = globalStatistics?.totalStock || 0;
  const numberOfFournisseurs = globalStatistics?.numberOfSuppliers || 0;
  const numberOfArticlesStockInf5 = globalStatistics?.numberOfLowStockArticles || 0;

  return (
    <div>
      <div>
        <h2>Total</h2>
        <p>Nombre d'articles : {numberOfArticles}</p>
        <p>Stock total : {totalStock}</p>
        <p>Nombre de fournisseurs : {numberOfFournisseurs}</p>
        <p>Nombre d'articles avec un stock inférieur à 5 : {numberOfArticlesStockInf5}</p>
      </div>
      <Collapsible />
    </div>
  );
};

export default Statistiques;

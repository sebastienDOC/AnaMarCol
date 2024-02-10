import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNumberOfArticlesWithStockBelow5, fetchNumberOfSuppliers, fetchStatistics, fetchStatisticsForCategory, fetchTotalStock } from '../../actions/statistics.actions';

const Statistiques = () => {
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.statisticsReducer);

  useEffect(() => {
    dispatch(fetchStatistics());
    dispatch(fetchTotalStock())
    dispatch(fetchNumberOfSuppliers())
    dispatch(fetchNumberOfArticlesWithStockBelow5())


  }, [dispatch]);

  // Vérifiez si statistics est défini avant d'accéder à ses propriétés
  const numberOfArticles = statistics?.numberOfArticles || 0;
  const totalStock = statistics?.totalStock || 0;
  const numberOfFournisseurs = statistics?.numberOfSuppliers || 0;
  const numberOfArticlesStockInf5 = statistics?.numberOfLowStockArticles || 0;

  return (
    <div>
      <h2>Total</h2>
      <p>Nombre d'articles : {numberOfArticles}</p>
      <p>Stock total : {totalStock}</p>
      <p>Nombre de fournisseurs : {numberOfFournisseurs}</p>
      <p>Nombre d'articles avec un stock inférieur à 5 : {numberOfArticlesStockInf5}</p>
    </div>
  );
};

export default Statistiques;

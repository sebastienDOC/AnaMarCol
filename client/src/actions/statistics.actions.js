import axios from 'axios';

export const SET_STATISTICS = 'SET_STATISTICS';

export const setStatistics = (statistics) => ({
  type: SET_STATISTICS,
  payload: statistics,
});

export const fetchStatistics = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/statistics/articles`);
      const data = response.data;

      dispatch(setStatistics(data));
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques :', error);
    }
  };
};

export const fetchTotalStock = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/statistics/stock`);
        const data = response.data;
  
        dispatch(setStatistics(data));
      } catch (error) {
        console.error('Erreur lors de la récupération du stock total :', error);
      }
    };
  };
  
  export const fetchNumberOfSuppliers = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/statistics/fournisseurs`);
        const data = response.data;
  
        dispatch(setStatistics(data));
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de fournisseurs :', error);
      }
    };
  };
  
export const fetchNumberOfArticlesWithStockBelow5 = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/statistics/articles/stockinf5`);
        const data = response.data;

        dispatch(setStatistics(data));
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre d\'articles avec un stock inférieur à 5 :', error);
      }
    };
  };
  
export const fetchStatisticsForFournisseur = (fournisseur) => {
    return async (dispatch) => {
        try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/statistics/fournisseurs/${fournisseur}`);
        const data = response.data;

        dispatch(setStatistics(data));
        } catch (error) {
        console.error(`Erreur lors de la récupération des statistiques pour le fournisseur ${fournisseur} :`, error);
        }
    };
};
  
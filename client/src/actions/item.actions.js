import axios from "axios";
import { getAllItems } from "./items.actions";
import { fetchArticlesWithLowStock, fetchStatisticsForEtat, fetchStatisticsForFournisseur } from "./statistics.actions";

export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";
export const SET_SELECTED_ITEM_QUANTITE = 'SET_SELECTED_ITEM_QUANTITE';
export const SET_SELECTED_ITEM_INFO = "SET_SELECTED_ITEM_INFO"
export const UPDATE_QUANTITE = "UPDATE_QUANTITE"
export const UPDATE_QUANTITE_SUCCESS = "UPDATE_QUANTITE_SUCCESS"
export const SET_MODIFIER_NAME = 'SET_MODIFIER_NAME'
export const SET_SELECTED_ITEM_ID = "SET_SELECTED_ITEM_ID"
export const UPLOAD_ITEM_PICTURE = "UPLOAD_ITEM_PICTURE"

export const addItem = (newItem) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/item/`, newItem);
      dispatch({
        type: ADD_ITEM_SUCCESS,
        payload: response.data.item,
      });

      // Mettez à jour les statistiques du fournisseur après la création de l'article
      dispatch(fetchStatisticsForFournisseur(newItem.fournisseur));
      dispatch(fetchStatisticsForEtat(newItem.etat));
      dispatch(fetchArticlesWithLowStock());
      dispatch(getAllItems());
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article", error);
      dispatch({
        type: ADD_ITEM_FAILURE,
        payload: error.message || 'Une erreur s\'est produite lors de l\'ajout de l\'article.',
      });
    }
  };
};

export const setSelectedItemQuantite = (quantite) => ({
  type: SET_SELECTED_ITEM_QUANTITE,
  payload: quantite,
});

export const setSelectedItemInfo = (itemInfo) => ({
  type: SET_SELECTED_ITEM_INFO,
  payload: itemInfo,
});

export const updateQuantite = (itemId, quantite, modifierName, operation) => {
  return (dispatch) => {
    const numericQuantite = parseInt(quantite, 10); // Convertir la quantité en nombre
    const newQuantite = operation === 'increment' ? numericQuantite - 1 : numericQuantite + 1;

    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/item/${itemId}`,
      data: { quantite: newQuantite, modifierName },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_QUANTITE,
          payload: { itemId, quantite: newQuantite, modifierName },
        });

        dispatch(fetchArticlesWithLowStock());
        dispatch(getAllItems());
      })
      .catch((err) => console.log(err));
  };
};

export const setModifierName = (modifierName) => ({
  type: SET_MODIFIER_NAME,
  payload: modifierName,
});
export const updateQuantiteSuccess = (updatedItemId, updatedQuantite, modifierName, operation ) => ({
  type: UPDATE_QUANTITE_SUCCESS,
  payload: { updatedItemId, updatedQuantite, modifierName, operation  },
});

export const setSelectedItemId = (itemId) => {
    return async (dispatch) => {
      try {
        if (itemId === null) {
          dispatch({ type: SET_SELECTED_ITEM_ID, payload: null });
        } else {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}api/item/${itemId}`);
          dispatch({ type: SET_SELECTED_ITEM_ID, payload: response.data });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'article", error);
      }
    };
};

export const uploadItemPicture = (data, id, modifierId) => {
  return (dispatch) => {
    data.append("modifierId", modifierId);

    return axios
      .post(`${process.env.REACT_APP_API_URL}api/item/upload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/item/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_ITEM_PICTURE, payload: res.data.image });
            dispatch(getAllItems());
          });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteItem = (itemId, fournisseur, etat) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}api/item/${itemId}`);

      dispatch({
        type: DELETE_ITEM_SUCCESS,
        payload: { itemId },
      });
      // Mettez à jour les statistiques du fournisseur après la suppression de l'article
      dispatch(fetchStatisticsForFournisseur(fournisseur));
      dispatch(fetchStatisticsForEtat(etat));
      dispatch(fetchArticlesWithLowStock());
      dispatch(getAllItems());
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article", error);
      dispatch({
        type: DELETE_ITEM_FAILURE,
        payload: error.message || 'Une erreur s\'est produite lors de la suppression de l\'article.',
      });
    }
  };
};

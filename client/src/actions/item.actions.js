import axios from "axios";
import { getAllItems } from "./items.actions";

export const ADD_ITEM = "ADD_ITEM"
export const SET_SELECTED_ITEM_QUANTITE = 'SET_SELECTED_ITEM_QUANTITE';
export const SET_SELECTED_ITEM_INFO = "SET_SELECTED_ITEM_INFO"
export const UPDATE_QUANTITE = "UPDATE_QUANTITE"
export const UPDATE_QUANTITE_SUCCESS = "UPDATE_QUANTITE_SUCCESS"
export const SET_SELECTED_ITEM_ID = "SET_SELECTED_ITEM_ID"
export const UPLOAD_ITEM_PICTURE = "UPLOAD_ITEM_PICTURE"
export const DELETE_ITEM = "DELETE_ITEM"

export const addItem = (newItem) => {
    return async (dispatch) => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}api/item/`, newItem);
        await dispatch(getAllItems());
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'article", error);
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

export const updateQuantite = (itemId, quantite) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/item/${itemId}`,
      data: { quantite },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_QUANTITE,
          payload: { itemId, quantite },
        });

        dispatch(getAllItems());
      })
      .catch((err) => console.log(err));
  };
};


export const updateQuantiteSuccess = (updatedItemId, updatedQuantite) => ({
  type: UPDATE_QUANTITE_SUCCESS,
  payload: { updatedItemId, updatedQuantite },
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

export const deleteItem = (itemId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/item/${itemId}`,
    })
    .then((res) => {
      dispatch({type: DELETE_ITEM, payload: {itemId}})
      dispatch(getAllItems());
    })
    .catch((err) => console.log(err));
  }
}
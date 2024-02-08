import axios from "axios";

export const GET_ALL_ITEMS = "GET_ALL_ITEMS"
export const ADD_ITEM = "ADD_ITEM"

export const getAllItems = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/item/`)
            .then((res) => {
                dispatch({type: GET_ALL_ITEMS, payload: res.data})
            })
            .catch((err) => console.log(err))
    }
}

// Async action using thunk
export const addItem = (newItem) => {
    return async (dispatch) => {
      try {
        // Envoi la requête pour ajouter l'article à la base de données
        await axios.post(`${process.env.REACT_APP_API_URL}api/item/`, newItem);
  
        // Dispatch l'action pour récupérer tous les articles (mise à jour du state)
        dispatch(getAllItems());
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'article", error);
      }
    };
};
  
  
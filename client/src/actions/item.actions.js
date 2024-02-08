import axios from "axios";

export const UPLOAD_ITEM_PICTURE = "UPLOAD_ITEM_PICTURE"
export const UPDATE_ITEM = "UPDATE_ITEM"

export const uploadItemPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/item/upload`, data)
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                    .then((res) => {
                        dispatch({type: UPLOAD_ITEM_PICTURE, payload: res.data.image})
                    })
            })
            .catch((err) => console.log(err))
    }
}

// export const updateItem = (itemId, quantite) => {
//     return(dispatch) => {
//         return axios({
//             method: "put",
//             url: `${process.env.REACT_APP_API_URL}api/item/` + itemId,
//             data: {quantite},
//             withCredentials: true
//         })
//         .then((res) => {
//             dispatch({type: UPDATE_ITEM, payload:quantite})
//         })
//         .catch((err) => console.log(err))
//     }
// }
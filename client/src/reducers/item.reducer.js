import { 
  ADD_ITEM, 
  SET_SELECTED_ITEM_QUANTITE, 
  SET_SELECTED_ITEM_INFO, 
  UPDATE_QUANTITE, 
  UPDATE_QUANTITE_SUCCESS,
  SET_SELECTED_ITEM_ID, 
  UPLOAD_ITEM_PICTURE, 
  DELETE_ITEM } from '../actions/item.actions';

const initialState = {
  selectedItemId: null,
  items: [],
  selectedItemQuantite: null,
  selectedItemInfo: null,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return state;

    case SET_SELECTED_ITEM_ID:
      return {
        ...state,
        selectedItemId: action.payload ? action.payload._id : null,
        selectedItemInfo: action.payload || null,
      };

    case UPLOAD_ITEM_PICTURE:
      return {
        ...state,
        selectedItemInfo: {
          ...state.selectedItemInfo,
          image: action.payload.image,
          modifierId: action.payload.modifierId,
        },
      };

    case SET_SELECTED_ITEM_QUANTITE:
      return {
        ...state,
        selectedItemQuantite: action.payload,
      };

    case SET_SELECTED_ITEM_INFO:
      return {
        ...state,
        selectedItemInfo: action.payload,
      };

      case UPDATE_QUANTITE:
        const { itemId, quantite } = action.payload;
        return {
          ...state,
          items: state.items.map(item => {
            if (item._id === itemId) {
              return {
                ...item,
                quantite: quantite,
              };
            }
            return item;
          }),
          selectedItemQuantite: state.selectedItemId === itemId ? quantite : state.selectedItemQuantite,
          selectedItemInfo: { 
            ...state.selectedItemInfo, 
            quantite: state.selectedItemId === itemId ? quantite : state.selectedItemQuantite,
          },
      };
           

    case UPDATE_QUANTITE_SUCCESS:
      const { updatedItemId, updatedQuantite } = action.payload;
      return {
        ...state,
        items: state.items.map(item => {
          if (item._id === updatedItemId) {
            return {
              ...item,
              quantite: updatedQuantite,
            };
          }
          return item;
        }),
        selectedItemQuantite: updatedQuantite,
        selectedItemInfo: { ...state.selectedItemInfo, quantite: updatedQuantite },
      };
      
    case DELETE_ITEM:
      const { [action.payload.itemId]: deletedItem, ...newState } = state;
      return newState;

    default:
      return state;
  }
}

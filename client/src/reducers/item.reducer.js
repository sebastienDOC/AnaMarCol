import { UPDATE_ITEM, UPLOAD_ITEM_PICTURE } from '../actions/item.actions';

const initialState = {};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_ITEM_PICTURE:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.itemId
            ? { ...item, image: action.payload.image }
            : item
        ),
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.itemId
            ? { ...item, quantite: action.payload.quantite }
            : item
        ),
      };
    default:
      return state;
  }
}

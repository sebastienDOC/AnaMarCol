import { GET_ALL_ITEMS, ADD_ITEM } from '../actions/items.actions';

const initialState = {
  items: [],
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_ITEM:
      return state;
    default:
      return state;
  }
}

import { 
    SET_STATISTICS,
} from '../actions/statistics.actions';

const initialState = {
    numberOfArticles: 0,
    totalStock: 0,
    numberOfSuppliers: 0,
    numberOfLowStockArticles: 0,
  };
  
  const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_STATISTICS:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default statisticsReducer;
  

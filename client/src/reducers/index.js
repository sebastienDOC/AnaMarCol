import { combineReducers } from "redux"; 
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import itemReducer from "./item.reducer";
import itemsReducer from "./items.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
    itemReducer,
    itemsReducer
})
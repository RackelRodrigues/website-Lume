import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import IDReducer from "./idbook/reducer";


const rootReducer = combineReducers({
    userReducer,
    IDReducer,

})

export default rootReducer;
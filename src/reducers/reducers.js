import {combineReducers} from "redux";
import navigationReducer from "./navigationReducer";
import modelsReducer from "./modelsReducer";
import userReducer from "./userReducer";

export default combineReducers({
    navigation: navigationReducer,
    models: modelsReducer,
    user: userReducer
})
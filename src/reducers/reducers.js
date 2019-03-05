import {combineReducers} from "redux";
import navigationReducer from "./navigationReducer";
import modelsReducer from "./modelsReducer";

export default combineReducers({
    navigation: navigationReducer,
    models: modelsReducer
})
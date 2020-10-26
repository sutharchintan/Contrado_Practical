import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { layoutReducer } from './layout-reducer';

/**
 * the main reducer to combine application reducers
 */
export default combineReducers({
    layout: layoutReducer,
    routing: routerReducer
});
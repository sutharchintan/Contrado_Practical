import { createStore, compose, applyMiddleware } from "redux";
import reducers from "../reducers";
import reduxThunk from 'redux-thunk';

/**
 * Create store to manage state over application
 */
export const store = createStore(
    reducers,
    compose(
        applyMiddleware(reduxThunk),
        window["devToolsExtension"] ? window["devToolsExtension"]() : (f: any) => f
    )
)
import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import {getProductsReducer, getProductDetailsReducer} from './reducers/productReducer'; 
import {cartReducer} from './reducers/cartReducer';



//we have multiple reducer thats why we need to combine all of them
const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer
});

//initialize middleware
const middleware = [thunk];


//here we pass only one reducer, but I need multiple reducer so nee to be combine, see above
const store = createStore(
      reducer,
      composeWithDevTools(applyMiddleware(...middleware)) //2nd argument take middleware
)

export default store;
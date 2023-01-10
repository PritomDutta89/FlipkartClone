import axios from "axios";
import * as actionType from '../constants/cartConstant';


const URL = "";

//Here need 2 action, 1st is add item in cart and 2nd remove item from cart
// use thunk
export const addToCart = (id, quantity)=> async(dispatch) => {
    try{
        const {data} = await axios.get(`${URL}/product/${id}`);
  
        dispatch({type: actionType.ADD_TO_CART , payload: {...data, quantity}}); //internally called Usereducer
      } catch(error){
        dispatch({type: actionType.ADD_TO_CART_ERROR , payload: error.message}); 
      }
}

// remove basis of ID
export const removeFromCart = (id)=>(dispatch) => {
    dispatch({type: actionType.REMOVE_FROM_CART , payload: id});
}
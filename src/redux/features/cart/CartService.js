import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/users/v1/`

//save cart

const saveCartDB = async (cartData) =>{
    const response = await axios.patch(
        API_URL + "saveCart",cartData
    )
    return response.data;
}


//get cart

const getCartDB = async () =>{
    const response = await axios.get(
        API_URL + "getCart"
    )
    return response.data;
}

const CartService = {
   saveCartDB,
   getCartDB,
}

export default CartService;
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { getCartQuantityById } from '../../../utlis';
import CartService from './CartService';

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;
//applyig discount

function applyDiscount(cartTotalAmount,discountPercentage){
    var discountAmount = (discountPercentage/100) * cartTotalAmount;
    var updatedTotal = cartTotalAmount -discountAmount;
    return updatedTotal;
}


const initialState = {
     cartItems :localStorage.getItem("cartItems") ?JSON.parse(localStorage.getItem("cartItems")) :[],
     cartTotalQuantity:0,
     cartTotalAmount:0,
     initialCartTotalAmount:0,
     isError:false,
     isSuccess:false,
     isLoading:false,
     message:''
}


//saveCart

export const saveCartDB = createAsyncThunk(
    "cart/saveCart",
    async(cartData,thunkAPI)=>{
        try{
            return await CartService.saveCartDB(cartData);
        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//get cartDB

export const getCartDB = createAsyncThunk(
    "cart/getCart",
    async(_,thunkAPI)=>{
        try{
            return await CartService.getCartDB();
        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)





const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state,action){
        const cartQuantity = getCartQuantityById(state.cartItems,action.payload._id);
        const productIndex = state.cartItems.findIndex((item)=>
            item._id === action.payload._id
        )
        if(productIndex >= 0){
            if(cartQuantity === action.payload.quantity){
                state.cartItems[productIndex].cartQuantity +=0;
                toast.info("Max number of product reached")
            }else{
                state.cartItems[productIndex].cartQuantity +=1;
                toast.success(`${action.payload.name} increased by 1`,{
                   position:"top-left"
               }) 
            }
             //item already exist in the localStorage
             //increase cart itmes
             
        }else{
            //item doesnt exist in the car
            //add in the cart
            const tempProduct = {...action.payload,cartQuantity:1};
            state.cartItems.push(tempProduct);
            toast.success(`${action.payload.name} added to cart`,{
                position:"top-left"
            })
        }
        //save to localstorage
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state,action){
        
        const productIndex = state.cartItems.findIndex((item)=>
            item._id === action.payload._id
        )
        console.log(productIndex);
        console.log(state.cartItems[productIndex]);
        if(state.cartItems[productIndex].cartQuantity>1){
            //decrease the cart
            state.cartItems[productIndex].cartQuantity -= 1;
            toast.success(`${action.payload.name} decreased to cart`,{
                position:"top-left"
            })
        }else if(state.cartItems[productIndex].cartQuantity === 1){
            const newCartItem = state.cartItems.filter((item)=>
                item._id !==action.payload._id
            )
            state.cartItems = newCartItem;
            toast.success(`${action.payload.name} removed from the cart`,{
                position:"top-left"
            })
        }
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state,action){
        const newCartItem = state.cartItems.filter((item)=>
        item._id !==action.payload._id)
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from the cart`,{
            position:"top-left"
        })
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },
    CLEAR_CAT(state,action){
        state.cartItems = [];
        toast.success(`Cart Cleared`,{
            position:"top-left"
        })
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },
    CALCULATE_TOTAL_QUANTITY(state,action){
        const array = [];
        state.cartItems?.map((item)=>{
             const {cartQuantity} = item;
             const quantity = cartQuantity;
             return array.push(quantity);
        })
        const totalQuantity = array.reduce((a,b)=>{
            return a+b;
        },0)
        state.cartTotalQuantity = totalQuantity;
    },
    CALCULATE_SUBTOTAL(state,action){
        const array = [];
        state.cartItems?.map((item)=>{
             const {price,cartQuantity} = item;
             const cartItemAmount = price * cartQuantity;
             return array.push(cartItemAmount);
        })
        const totalAmount = array.reduce((a,b)=>{
            return a+b;
        },0)
        state.initialCartTotalAmount = totalAmount;

        if(action.payload && action.payload.coupon !== null){
             const discountedTotalAmount = applyDiscount(totalAmount,action.payload.coupon.discount);
             state.cartTotalAmount= discountedTotalAmount;
        }else{
            state.cartTotalAmount = totalAmount;
        }
        
    }
   },
   extraReducers : (builder) => {
     builder
     .addCase(saveCartDB.pending,(state)=>{
        state.isLoading = true;
     })
     .addCase(saveCartDB.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isSuccess = true;
       state.isError = false;
       console.log(action.payload)
       
     })
     .addCase(saveCartDB.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message=action.payload;
      toast.error(action.payload)
    })
    //getCart
    .addCase(getCartDB.pending,(state)=>{
        state.isLoading = true;
     })
     .addCase(getCartDB.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isSuccess = true;
       state.isError = false;
       localStorage.setItem('cartItems',JSON.stringify(action.payload))
       if(action.payload.length>0){
        window.location.href = FRONTEND_URL + "/cart";
       }else{
        window.location.href = FRONTEND_URL;
       }
      
       
     })
     .addCase(getCartDB.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message=action.payload;
      toast.error(action.payload)
    })  

   }
});

export const {ADD_TO_CART, DECREASE_CART,REMOVE_FROM_CART,CLEAR_CAT,CALCULATE_TOTAL_QUANTITY,CALCULATE_SUBTOTAL} = CartSlice.actions
export const  selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export default CartSlice.reducer;
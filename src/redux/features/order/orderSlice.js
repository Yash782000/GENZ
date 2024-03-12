import {toast} from "react-toastify"
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import orderService from "./orderService";

const initialState = {
      order:null,
      orders:[],
      totalOrderAmount : 0,
      isError:false,
      isSuccess:false,
      isLoading:false,
      message:''
}

//create order

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async(formData,thunkAPI)=>{
        try{
            return await orderService.createOrder(formData);
        }
        catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//get orders
export const getOrders = createAsyncThunk(
    "order/getOrders",
    async(_,thunkAPI)=>{
        try{
            return await orderService.getOrders();
        }
        catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)


//get order
export const getOrder = createAsyncThunk(
    "order/getOrder",
    async(id,thunkAPI)=>{
        try{
            return await orderService.getOrder(id);
        }
        catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//update order status
export const updateOrderStatus= createAsyncThunk(
    "order/updateOrderStatus",
    async({id,formData},thunkAPI)=>{
        try{
            return await orderService.updateOrderStatus(id,formData);
        }
        catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
    builder
    .addCase(createOrder.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(createOrder.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log("hy");
        console.log(action.payload)
        toast.success(action.payload)
    })
    .addCase(createOrder.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
    })
    .addCase(getOrders.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(getOrders.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
        toast.success(action.payload)
    })
    .addCase(getOrders.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
    })
    //get order
    .addCase(getOrder.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(getOrder.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload;
        toast.success(action.payload)
        console.log(action.payload);
    })
    .addCase(getOrder.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
    })
    //update order Status
    .addCase(updateOrderStatus.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(updateOrderStatus.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload)
        console.log(action.payload);
    })
    .addCase(updateOrderStatus.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
    })
  }
});


export const {} = orderSlice.actions
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrderAmount = (state) => state.order.totalOrderAmount;
export default orderSlice.reducer
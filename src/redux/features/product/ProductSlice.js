import {toast} from "react-toastify"
import ProductService from './ProductService';
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { shortenText } from "../../../utlis";

const initialState = {
   product:null,
   products:[],
   minPrice:null,
   maxPrice:null,
   totalStoreValue:0,
   outOfStock:0,
   isError:false,
   isLoading:false,
   isSuccess:false,
   message:"",
   category:[],
}

export const createProduct = createAsyncThunk(
    "auth/createProduct",
    async(formData,thunkAPI)=>{
        try{
           
            return await ProductService.createProduct(formData);
        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//get Product

export const getProduct = createAsyncThunk(
    "auth/getProduct",
    async(_,thunkAPI)=>{
        try{
            return await ProductService.getProduct()
        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }

    }
)


//delete product

export const deleteProduct = createAsyncThunk(
    "auth/deleteProduct",
    async(id,thunkAPI)=>{
        try{
            return await ProductService.deleteProduct(id)
        }
        catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)
//get Products

export const getProducts = createAsyncThunk(
    "auth/getProducts",
    async(id,thunkAPI)=>{
        try{
            return await ProductService.getProducts(id)
        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }

    }
)

//update Product

export const  updateProduct = createAsyncThunk(
    "auth/updateProduct",
    async({id,formData},thunkAPI)=>{
        try{
            return await ProductService.updateProduct(id,formData);
        }
        catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)
const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    RESET_PRODUCT(state){
        state.isError=false
        state.isLoading=false
        state.isSuccess=false
        state.message=""
    },
    GET_ALL_RANGE(state,action){
        const {products} = action.payload;
        const array = [];
        products.map((product)=>{
            const price = product.price;
            return array.push(price);
        })
        const max = Math.max(...array);
        const min = Math.min(...array);

        state.minPrice = min;
        state.maxPrice = max;
    }
  },
  extraReducers : (builder) => {
    builder
    //createProduct
    .addCase(createProduct.pending,(state)=>{
       state.isLoading = true;
     })
     .addCase(createProduct.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isSuccess = true;
       state.isError = false;
       console.log(action.payload.stack);
       if(action.payload && action.payload.hasOwnProperty("stack")){
        
        toast.error(shortenText(action.payload.stack),16)
        
       }else{
        state.message = "Product Created Successfully"
        toast.success("Product Created Successfull")
       }
       
     })
     .addCase(createProduct.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message=action.payload;
      toast.error(action.payload)
    }) 
    //get Product
    .addCase(getProduct.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        console.log(action.payload);
        toast.success(action.payload);
      })
      .addCase(getProduct.rejected,(state,action)=>{
       state.isLoading = false;
       state.isError = true;
       state.message=action.payload;
       toast.error(action.payload)
     })
     //delete product
     .addCase(deleteProduct.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        
        
        toast.success("product deleted succsfully");
      })
      .addCase(deleteProduct.rejected,(state,action)=>{
       state.isLoading = false;
       state.isError = true;
       state.message=action.payload;
       toast.error(action.payload)
     })
      //get products
      .addCase(getProducts.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        console.log(action.payload);
        
      })
      .addCase(getProducts.rejected,(state,action)=>{
       state.isLoading = false;
       state.isError = true;
       state.message=action.payload;
       toast.error(action.payload)
     })
     //update products
     .addCase(updateProduct.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload.stack);
        if(action.payload && action.payload.hasOwnProperty("stack")){
        
        toast.error(shortenText(action.payload.stack),16)
        
       }else{
        state.message = "Product updated Successfully"
        toast.success("Product updated Successfull")
       }
        
      })
      .addCase(updateProduct.rejected,(state,action)=>{
       state.isLoading = false;
       state.isError = true;
       state.message=action.payload;
       toast.error(action.payload)
     })

  }
});

export const {RESET_PRODUCT,GET_ALL_RANGE} = ProductSlice.actions
export const selectProduct = (state) => state.product.product;
export const isLoading = (state) => state.product.isLoading;
export default ProductSlice.reducer
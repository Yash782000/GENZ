import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import CategoryAndBrandService from './CategoryAndBrandService'
import {toast} from "react-toastify"

const initialState = {
   categories:[],
   brands:[],
   isError:false,
   isLoading:false,
   isSuccess:false,
   message:""
}

/*export const(createCategory = createAsyncThunk(
    "auth(createCategory",
    async (userData,thunkAPI) =>{
        try {
            return await authService(createCategory(userData);
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)*/

//create a category
export const createCategory = createAsyncThunk(
    "auth/createCategory",
    async(formData,thunkAPI)=>{
        try{
           
            return await CategoryAndBrandService.createCategory(formData);
        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//get Category

export const getCategory = createAsyncThunk(
    "auth/getCategory",
    async(_,thunkAPI)=>{
        try{
            return await CategoryAndBrandService.getCategory();

        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//delete category

export const deleteCategory = createAsyncThunk(
    'auth/deleteCategory',
    async(slog,thunkAPI)=>{
        try{
            return await CategoryAndBrandService.deleteCategory(slog);
        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//create brand
export const createBrand = createAsyncThunk(
    "auth/createBrand",
    async(formData,thunkAPI)=>{
        try{
           
            return await CategoryAndBrandService.createBrand(formData);
        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//get brand

export const getBrand  = createAsyncThunk(
    "auth/getBrand",
    async(_,thunkAPI)=>{
        try{
            return await CategoryAndBrandService.getBrand();
        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }

    }
)

//delete Brand
export const deleteBrand = createAsyncThunk(
    "auth/deleteBrand",
    async(slog,thunkAPI)=>{
        try{
            return await CategoryAndBrandService.deleteBrand(slog);
        }catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }

    }
)

const CategoryAndBrandSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    RESET_CAT(state){
        state.isError=false
        state.isLoading=false
        state.isSuccess=false
        state.message=""
        
    }
  },
    extraReducers:(builder) =>{
        builder
        //CREATE CATEGORY
     .addCase(createCategory.pending,(state)=>{
        state.isLoading = true;
     })
     .addCase(createCategory.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isSuccess = true;
       state.isError = false;
       toast.success("Category Created Successfull")
       
     })
     .addCase(createCategory.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message=action.payload;
      toast.success(action.payload)
    }) 
    //get category
    .addCase(getCategory.pending,(state)=>{

        state.isLoading = true;
     })
     .addCase(getCategory.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isSuccess = true;
       state.isError = false;
       state.categories = action.payload;
    })
     .addCase(getCategory.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message=action.payload;
      toast.success(action.payload)
    })
    //delete category
    .addCase(deleteCategory.pending,(state)=>{

        state.isLoading = true;
     })
     .addCase(deleteCategory.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isSuccess = true;
       state.isError = false;
       toast.success(action.payload);
    })
     .addCase(deleteCategory.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message=action.payload;
      toast.success(action.payload)
    })
    //create brand
    .addCase(createBrand.pending,(state)=>{
        state.isLoading = true;
     })
     .addCase(createBrand.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isSuccess = true;
       state.isError = false;
       toast.success("Brand Created Successfull")
       console.log(action.payload)
     })
     .addCase(createBrand.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message=action.payload;
      toast.error(action.payload)
    }) 
    //get Brand
    .addCase(getBrand.pending,(state)=>{

        state.isLoading = true;
     })
     .addCase(getBrand.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isSuccess = true;
       state.isError = false;
       state.brands = action.payload;
    })
     .addCase(getBrand.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message=action.payload;
      toast.success(action.payload)
    })
    //delete brand
    .addCase(deleteBrand.pending,(state)=>{
      state.isLoading = true;
     })
     .addCase(deleteBrand.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isSuccess = true;
       state.isError = false;
       toast.success(action.payload);
    })
     .addCase(deleteBrand.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message=action.payload;
      toast.success(action.payload)
    })        
    
  }
});

export const {RESET_CAT} = CategoryAndBrandSlice.actions

export default CategoryAndBrandSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts:[]
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state,action){
       const {products,search} = action.payload;
       const tempProducts = products?.filter((product)=>
        product.name?.toLowerCase().includes(search.toLowerCase()) || product.category?.toLowerCase().includes(search.toLowerCase())
       );
       
       state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS(state,action){
        const {products,sort} = action.payload;
        let tempProduct = [];
        if(sort === "latest"){
            tempProduct = products;
        }
        if(sort === "lowest-price"){
            tempProduct = products.slice().sort((a,b)=>{
                return a.price - b.price;
            })
        }
        if(sort === "highest-price"){
            tempProduct = products.slice().sort((a,b)=>{
                return b.price - a.price;
            })
        }
        if(sort === "a-z"){
            tempProduct = products.slice().sort((a,b)=>{
                return a.name.localeCompare(b.name);
            })
        }
        if(sort === "z-a"){
            tempProduct = products.slice().sort((a,b)=>{
                return b.name.localeCompare(a.name);
            })
        }
        state.filteredProducts = tempProduct;
    },
    FILTER_BY_CATEGORY(state,action){
        const {products,category} = action.payload;
        let tempProduct = [];
        if(category === "All"){
           tempProduct = products;
        }
        else{
            tempProduct = products.filter((product)=> product.category === category);
            
        }
        state.filteredProducts = tempProduct;
    },
    FILTER_BY_BRAND(state,action){
        const {products,brand} = action.payload;
        let tempProduct = [];
        if(brand === "All"){
           tempProduct = products;
        }
        else{
            tempProduct = products.filter((product)=> product.brand === brand);
            
        }
        state.filteredProducts = tempProduct;
    },
    FILTER_BY_PRICE(state,action){
        const {products,price} = action.payload;
        let tempProduct = [];
        tempProduct = products.filter((product)=>{
            return product.price >= price[0] && product.price <= price[1]
        })
        state.filteredProducts = tempProduct;
    }
  }
});

export const {FILTER_BY_SEARCH,SORT_PRODUCTS, FILTER_BY_CATEGORY,FILTER_BY_BRAND,FILTER_BY_PRICE} = filterSlice.actions
export const selectFliteredProducts = (state) => state.filter.filteredProducts;
export default filterSlice.reducer;
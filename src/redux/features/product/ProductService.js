import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/products/`



const createProduct = async (formData) =>{
   
    const response = await axios.post(API_URL , formData);
    return response.data;
}

//get Product


const getProduct =  async () =>{
    const response = await axios.get(API_URL);
    return response.data;
}

//delete product

const deleteProduct = async(id) =>{
    const response = await axios.delete(API_URL+id);
    return response.data;
}

//get products

const getProducts = async(id) =>{
    const response = await axios.get(API_URL+id);
    return response.data;
}

//Update Product

const updateProduct = async(id,formData) =>{
    const response = await axios.patch(API_URL+id,formData)
    return response.data;
}

const ProductService = {
     createProduct,
     getProduct,
     deleteProduct,
     getProducts,
     updateProduct
}

export default ProductService;
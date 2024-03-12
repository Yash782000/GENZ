import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/`



const createCategory = async (formData) =>{
   
    const response = await axios.post(API_URL + "category/createCategory",formData);
    return response.data;
}

//getCategory

const getCategory = async () =>{
   const response = await axios.get(API_URL + "category/getCategory");
   return response.data;
}

//delete category

const deleteCategory = async(slog) =>{
    const response = await axios.get(API_URL + "category/" + slog);
    return response.data.message;
}

//create Brand

const createBrand = async(formData) =>{
    const response = await axios.post(API_URL + "brand/createBrand",formData);
    return response.data;
}

//get brands

const getBrand = async() =>{
    const response = await axios.get(API_URL + "brand/getBrand");
    return response.data;
}

//delete Brand

const deleteBrand = async (slog) =>{
    const response = await axios.get(API_URL+"brand/"+slog);
    return response.data.message;
}



const CategoryAndBrandService = {
    createCategory,
    getCategory,
    deleteCategory,
    createBrand,
    getBrand,
    deleteBrand,
}
export default CategoryAndBrandService;
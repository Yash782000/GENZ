import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../loader/Loader'
import ProductForm from '../ProductForm/ProductForm'
import { getBrand, getCategory } from '../../../redux/features/CategoryAndBrand/CategoryAndBrandSlice'
import { RESET_PRODUCT, createProduct } from '../../../redux/features/product/ProductSlice'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
const initialState = {
    name:"",
    category:"",
    brand:"",
    quantity:"",
    price:"",
    color:"",
    regularPrice:""
}

const AddProduct = () => {
    const [description,setDescription] = useState('')
    const [files,setFiles] = useState([])
    const [product,setProduct] = useState(initialState)
    const [filterBrand,setFilterBrand] = useState([]);
    const{name,category,brand,quantity,regularPrice,price,color} = product;
    const {isLoading,message} = useSelector((state)=>state.product)
    const {categories,brands} = useSelector((state)=>state.category);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const saveProduct = async(e) =>{
        e.preventDefault();
        
        //if(files.length < 1){
       //    return toast.error("add atleast 1 product ")
        //}
        const formData = {
            name,
            sku:generateSKU(category),
            category,
            brand,
            color,
            quantity:Number(quantity),
            regularPrice,
            price,
            description,
            image:files
        }
      
        //console.log(formData);
        await dispatch(createProduct(formData))
        //navigate("/admin/all-products");
    }
    useEffect(()=>{
        if(message === "Product Created Successfully"){
            navigate("/admin/all-products")
        }
        dispatch(RESET_PRODUCT());
    },[message,navigate,dispatch])
    const handleInputChange = (e) =>{
    
        const {name,value} = e.target;
        setProduct({...product,[name]:value})
    }
    const generateSKU = (category) =>{
        const letter = category.slice(0,3).toUpperCase();
        const number = Date.now();
        const sku = letter+"-"+number;
        return sku;
    }
    useEffect(()=>{
         dispatch(getCategory())
         dispatch(getBrand());
    },[])
    const filterBrands = (selectedCategory) =>{
       const newBrands = brands.filter((brand)=>brand.category === selectedCategory)
       console.log(newBrands)
       setFilterBrand(newBrands);
    }
    useEffect(()=>{
        filterBrands(category);
        
    },[category])
  return (
    <section>
        <div className='container'>
            {isLoading && <Loader/>}
            <h3 className='--mt'>Add New Products</h3>

            <ProductForm 
                product={product} 
                saveProduct={saveProduct}
                handleInputChange={handleInputChange}
                categories={categories}
                isEditing={false}
                filterBrand={filterBrand}
                description={description}
                setDescription={setDescription}
                files={files}
                setFiles={setFiles}
                />
        </div>
    </section>
  )
}

export default AddProduct
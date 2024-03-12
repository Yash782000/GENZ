import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { RESET_PRODUCT, getProducts, isLoading, selectProduct, updateProduct } from '../../../redux/features/product/ProductSlice';
import { getBrand, getCategory } from '../../../redux/features/CategoryAndBrand/CategoryAndBrandSlice';
import Loader from '../../loader/Loader';
import ProductForm from '../ProductForm/ProductForm';

const EditProduct = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const productEdit = useSelector(selectProduct);
    const navigate = useNavigate();
    const [description,setDescription] = useState('')
    const [files,setFiles] = useState([])
    const [product,setProduct] = useState(productEdit)
    const [filterBrand,setFilterBrand] = useState([]);
   
    const {isLoading,message} = useSelector((state)=>state.product)
    const {categories,brands} = useSelector((state)=>state.category);

    const handleInputChange = (e) =>{
    
        const {name,value} = e.target;
        setProduct({...product,[name]:value})
    }
   
    useEffect(()=>{
        dispatch(getCategory())
        dispatch(getBrand());
   },[])
    useEffect(()=>{
        dispatch(getProducts(id));
    },[dispatch])
    const filterBrands = (selectedCategory) =>{
        const newBrands = brands.filter((brand)=>brand.category === selectedCategory)
        console.log(newBrands)
        setFilterBrand(newBrands);
     }
     useEffect(()=>{
         filterBrands(product?.category);
         
     },[product?.category])
     const saveProduct = async(e) =>{
        e.preventDefault();
        
        //if(files.length < 1){
       //    return toast.error("add atleast 1 product ")
        //}
        const formData = {
            name:product.name,
            category:product.category,
            brand:product.brand,
            color:product.color,
            quantity:Number(product.quantity),
            regularPrice:product.regularPrice,
            price:product.price,
            description,
            image:files
        }
      
        //console.log(formData);
        await dispatch(updateProduct({id,formData}))
        //navigate("/admin/all-products");
    }
    useEffect(()=>{
        if(message === "Product updated Successfully"){
            navigate("/admin/all-products")
        }
        dispatch(RESET_PRODUCT());
    },[message,navigate,dispatch])

    useEffect(()=>{
        setProduct(productEdit);
        setDescription(
            productEdit && productEdit.description ?  productEdit?.description:""
        )
        if(productEdit && productEdit?.image){
            setFiles(productEdit.image)
        }

    },[productEdit])
  return (
    <section>
    <div className='container'>
        {isLoading && <Loader/>}
        <h3 className='--mt'>Edit Products</h3>

        <ProductForm 
            product={product} 
            saveProduct={saveProduct}
            handleInputChange={handleInputChange}
            categories={categories}
            isEditing={true}
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

export default EditProduct
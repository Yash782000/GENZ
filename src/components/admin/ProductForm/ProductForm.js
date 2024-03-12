import React from 'react'
import "./ProductForm.scss"
import Card from '../../card/Card'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UploadWidget from './UploadWidget';
import { BsTrash } from "react-icons/bs";

const ProductForm = ({product,saveProduct,handleInputChange,categories,isEditing,filterBrand,description,setDescription,files,setFiles}) => {
  const removeImage = (image) =>{
      setFiles(files.filter((img,index)=> img!==image));
  }
  return (
    <div className='add-product'>
        <UploadWidget files={files} setFiles ={setFiles}/>

        <Card cardClass={"card"}>
            <br/>
            <form onSubmit={saveProduct}>
               <label>Product Images</label>
               <div className="slide-container">
                <aside>
                    {files.length>0 &&
                      files?.map((image,index)=>{
                        return(
                        <div key={index} className='thumbnail'>
                             <img src={image} alt="productImage" height={100}/>
                             <div>
                             <BsTrash size={25} className='thumbnailIcon'onClick={()=>removeImage(image)}/>
                             </div>
                        </div>
                        )
                      })}
                      {files.length<1 && (
                        <p className='--m'>No image set for this product</p>
                      )}
                </aside>
               </div>
               <label>Product Name :</label>
               <input
                 type="text"
                 placeholder='Product Name'
                 name="name"
                 value = {product?.name}
                 onChange={handleInputChange}
               />
               <label>Product Category :</label>
               <select name="category" value={product?.category} onChange={handleInputChange} >
                  {isEditing ? (
                    <option value={product?.category}>{product?.category}</option>
                  ):(
                   
                    <option>Select Category</option>
                    
                    )}
                    {categories?.length >0 &&
                        categories?.map((cat)=>{
                           return(
                             <option key={cat._id} value={cat.name}>{cat.name}</option>
                           )
                    })}
                    
               </select>
               <label>Product Brand :</label>
               <select name="brand" value={product?.brand} onChange={handleInputChange} >
                  {isEditing ? (
                    <option value={product?.brand}>{product?.brand}</option>
                  ):(
                   
                    <option>Select Brand</option>
                    
                    )}
                    {filterBrand?.length >0 &&
                        filterBrand?.map((brand)=>{
                           return(
                             <option key={brand._id} value={brand.name}>{brand.name}</option>
                           )
                    })}
                    
               </select>
               <label>Product Color</label>
               <input
                 type="text"
                 placeholder='Product Color'
                 name="color"
                 value={product?.color}
                 onChange={handleInputChange}
               />
               <label>Regular Price</label>
               <input
                type="number"
                placeholder='regularPrice'
                value={product?.regularPrice}
                name="regularPrice"
                onChange={handleInputChange}
               />
               <label>Product Price</label>
               <input
                type="number"
                placeholder='Price'
                value={product?.price}
                name="price"
                onChange={handleInputChange}
               />
               <label>Product Quantity</label>
               <input
                type="number"
                placeholder='Quantity'
                value={product?.quantity}
                name="quantity"
                onChange={handleInputChange}
               />
               <label>Product Description</label>
               <ReactQuill 
                   theme="snow" 
                   value={description} 
                   onChange={setDescription}
                 />
            <div className='--my3'>
                <button type="sybmit" className='--btn --btn-primary'>
                        Save Product
                </button>
                </div>
            </form>
        </Card>
    </div>
  )
}

export default ProductForm
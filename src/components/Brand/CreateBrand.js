import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../card/Card'
import { createBrand, getBrand, getCategory } from '../../redux/features/CategoryAndBrand/CategoryAndBrandSlice'

const CreateBrand = ({reloadCategory}) => {
  const [name,setName] =useState("")
  const [category,setCategory] = useState("");
  const {isLoading,categories} = useSelector((state)=>state.category);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCategory());
  },[dispatch])
  const saveBrand = async (e)=>{
      e.preventDefault();
      if(name.length <3){
        return toast.error("Brand name must be upto 6 characters")
      }
      if(!category){
        return toast.error("Please add a current Category")
      }

      const formData ={
        name,
        category
      }
      dispatch(createBrand(formData));
      dispatch(getBrand())
      setName("")
      reloadCategory();
  }

  return (
    <>
    {isLoading && <Loader/>}
    <div className='--mb3'>
        <h2>Create a Brand </h2>
        <p>use the form to <b>create a brand</b></p>
        <Card cardClass={"card"}>
            <br/>

            <form onSubmit={saveBrand}>
                <label>Brand Name</label>
                <input 
                    type="text"
                    placeholder='brand name'
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                    />
                <label>Parent Categories :</label>
                <select name="category" className='form-control' onChange={(e)=>setCategory(e.target.value)}>
                   <option>Select Category</option>
                   {categories?.length >0 && categories?.map((category)=>{
                        return(
                        <option key={category._id} value={category.name}>{category.name}</option>
                        )
                   })}
                </select>
                <div className='--my1'>
                    <button type="sybmit" className='--btn --btn-primary'>
                        Save Brand
                    </button>
                </div>
            </form>
        </Card>
    </div>
    </>
  )
}

export default CreateBrand
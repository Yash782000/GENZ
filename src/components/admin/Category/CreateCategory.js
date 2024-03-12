import React, { useState } from 'react'
import Card from '../../card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, getCategory } from '../../../redux/features/CategoryAndBrand/CategoryAndBrandSlice'
import { toast } from 'react-toastify'
import Loader from '../../loader/Loader'


const CreateCategory = ({reloadCategory}) => {
  const [name,setName] =useState("")
  const {isLoading} = useSelector((state)=>state.category);
  const dispatch = useDispatch();
  const saveCategory = async (e)=>{
      e.preventDefault();
      console.log(name);
      if(name.length <3){
        return toast.error("Coupoun must be up to 3 characters");
      }
      const formData = {
        name
      }
      console.log(formData);
      dispatch(createCategory(formData));
      setName("")
      dispatch(getCategory());
      reloadCategory();
  }
  return (
    <>
    {isLoading && <Loader/>}
    <div className='--mb3'>
        <h2>Create a Category</h2>
        <p>use the form to <b>create a category</b></p>
        <Card cardClass={"card"}>
            <br/>

            <form onSubmit={saveCategory}>
                <label>Category Name</label>
                <input 
                    type="text"
                    placeholder='category name'
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                    />
                <div className='--my1'>
                    <button type="sybmit" className='--btn --btn-primary'>
                        Save Category
                    </button>
                </div>
            </form>
        </Card>
    </div>
    </>
  )
}

export default CreateCategory
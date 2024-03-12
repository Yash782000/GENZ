import React from 'react'
import CreateCategory from './CreateCategory'
import CategoryList from './CategoryList'
import "./Category.scss"
import { getCategory } from '../../../redux/features/CategoryAndBrand/CategoryAndBrandSlice';
import { useDispatch } from 'react-redux'
const Category = () => {
  const dispatch = useDispatch()
  const reloadCategory = ()=>{
    dispatch(getCategory());
  }
  return (
    <section>
        <div className='container coupon'>
            <CreateCategory reloadCategory = {reloadCategory}/>
            <CategoryList />
        </div>
    </section>
  )
}

export default Category
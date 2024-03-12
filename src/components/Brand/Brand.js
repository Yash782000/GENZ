import React from 'react'
import "./Brand.scss"
import BrandList from './BrandList'
import CreateBrand from './CreateBrand'
import { getBrand, getCategory } from '../../redux/features/CategoryAndBrand/CategoryAndBrandSlice'
import { useDispatch } from 'react-redux'

const Brand = () => {
  const dispatch = useDispatch();
  const reloadCategory = ()=>{
    dispatch(getBrand());
  }
  return (
    <section>
    <div className='container coupon'>
        <CreateBrand reloadCategory={reloadCategory}/>
        <BrandList/>
    </div>
</section>
  )
}

export default Brand
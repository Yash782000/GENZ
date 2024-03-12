import React, { useEffect } from 'react'
import Slider from '../../components/slider/Slider'
import HomeInfoBox from './HomeInfoBox'
import "./Home.scss"
import { productData } from '../../components/corousel/data'
import Carousel from 'react-multi-carousel'
import CarouselItem from '../../components/corousel/CarouselItem'
import ProductCarousel from '../../components/corousel/Carousel'
import ProductCategory from './ProductCategory'
import FooterLinks from '../../components/footer/FooterLinks'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../redux/features/product/ProductSlice'

const PageHeading = ({heading,btnText}) =>{
     
     return(
      <>
      <div className="--flex-between">
        <h2 className='--fw-thin'>{heading}</h2>
        <button className='--btn'>
          {btnText}
        </button>
        </div>
        <div className="--hr"></div>
      </>

     )
}
function Home() {
  const dispatch = useDispatch();
     useEffect(()=>{
      dispatch(getProduct());
     },[dispatch])
     const {products} = useSelector((state)=>state.product)
     console.log(products);
     const latest = products?.filter((product)=>{
      return product.quantity >0;
     })?.filter((product,index)=>index < 5)
     const phones = products?.filter((product)=>{
      return product.quantity >0;
     })?.filter((product,index)=>product.category === "mobile phone")?.filter((product,index)=>index < 5)
     console.log(phones);
  const latestProduct = latest.map((item)=>(
    <div key={item.id}>
        <CarouselItem 
          name={item.name}
          url ={item.image[0]}
          price = {item.price}
          description={item.description}
          product={item}
          regularPrice={item.regularPrice}
        />
    </div>
  ))
  const phoneProduct = phones.map((item)=>(
    <div key={item.id}>
        <CarouselItem 
          name={item.name}
          url ={item.image[0]}
          price = {item.price}
          description={item.description}
          product={item}
          regularPrice={item.regularPrice}
        />
    </div>
  ))
  /*const productss = productData.map((item)=>(
    <div key={item.id}>
        <CarouselItem 
          name={item.name}
          url ={item.image[0]}
          price = {item.price}
          regularPrice={item.regularPrice}
          product={item}
          description={item.description}
        />
    </div>
  ))*/
  return (
    <>
    <Slider/>
    <section>
      <div className='container'>
        <HomeInfoBox/>
        <PageHeading heading={"Latest Products"} btnText={"Shop Now"}/>
        <ProductCarousel products={latestProduct}/>
      </div>
    </section>
    <section className='--bg-grey'>
      <div className='container'>
        <h3>Categories</h3>
        <ProductCategory />
      </div>
    </section>
    <section>
      <div className='container'>
        <PageHeading heading={"Mobile Phones"} btnText={"Shop Now"}/>
        <ProductCarousel products={phoneProduct}/> 
      </div>
    </section>
    <FooterLinks/>
    </>
  )
}

export default Home
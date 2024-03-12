import React, { useEffect, useState } from 'react'
import styles from "./ProductDetails.module.scss"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/features/product/ProductSlice';
import { Spinner } from '../../loader/Loader';
import ProductRating from '../productRating/ProductRating';
import { calculateAverageRating, shortenText } from '../../../utlis';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import Card from '../../card/Card';
import { ADD_TO_CART, DECREASE_CART, saveCartDB, selectCartItems } from '../../../redux/features/cart/CartSlice';
const ProductDetails = () => {
  const {id} = useParams();
  const {product,isLoading} = useSelector((state)=>state.product);
  const [imageIndex,setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const cartItems = useSelector(selectCartItems);
  const isCartAdded = cartItems.findIndex((cart)=> {
    return cart._id === id;
  })
  const cart = cartItems.find((cart)=> cart._id === id);
  const averageRating = calculateAverageRating(product?.ratings);
  useEffect(()=>{
    dispatch(getProducts(id))
  },[dispatch]);
  const slideLength = product?.image?.length;
  const addToCart = (product) =>{
    dispatch(ADD_TO_CART(product))
    navigate("/cart");
    dispatch(saveCartDB({cartItems:JSON.parse(localStorage.getItem("cartItems"))}));
  }
  const decreaseCart = (product) =>{
    dispatch(DECREASE_CART(product))
    dispatch(saveCartDB({cartItems:JSON.parse(localStorage.getItem("cartItems"))}));
  }
  const nextSlide = ()  =>{
    setImageIndex(imageIndex===slideLength-1?0:imageIndex+1)
  }
  let slideInterval;
  useEffect(()=>{
    if(product?.image.length>1){
        const auto = () =>{
            slideInterval = setInterval(nextSlide,3000);
        }
        
        auto();
    };
    return ()=>clearInterval(slideInterval);
  },[imageIndex,product,slideInterval])
  
  return (
    <section>
        <div className={`container ${styles.product}`}>
            <h2>Product Details</h2>
            <div>
                <Link to="/shop">&larr; Back To Products</Link>
            </div>
            {isLoading ? (
                <Spinner/>
            ):(
                <>
                <div className={styles.details}>
                    <div className={styles.img}>
                       <img src={product?.image[imageIndex]} alt={product?.name} className={styles.pImg} />
                       <div className={styles.smallImg}>
                        {product?.image.map((img,index)=>{
                            return(
                                <img src={img}  key={index} alt="products" onClick={()=>nextSlide}
                                className={imageIndex === index ? "activeImg" : ""}/>
                            )
                        })}
                        </div>
                    </div>
                    <div className={styles.content}>
                        <h3>{product?.name}</h3>
                        <ProductRating averageRating={averageRating} noOfRatings={product?.ratings?.length}/>
                        <div className='--underline'></div>
                        <div className={styles.property}>
                            <p>
                                <b>Price:</b>
                            </p>
                            <p className={styles.price}>{`$${product?.price}`}</p>
                        </div>
                        <div className={styles.property}>
                            <p><b>SKU:</b> </p>
                            <p>{product?.sku}</p>
                        </div>
                        <div className={styles.property}>
                           <p><b>Category:</b> </p>
                            <p>{product?.category}</p>
                        </div>
                        <div className={styles.property}>
                            <p><b>Brand:</b> </p>
                            <p>{product?.brand}</p>
                        </div>
                        <div className={styles.property}>
                            <p><b>Color:</b> </p>
                            <p>{product?.color}</p>
                        </div>
                        <div className={styles.property}>
                            <p><b>Quantity in Stocks:</b></p>
                            <p>{product?.quantity}</p>
                        </div>
                        <div className={styles.property}>
                            <p><b>Sold:</b></p>
                            <p>{product?.sold}</p>
                        </div>
                        <div className={styles.count}>
                            {isCartAdded < 0 ?null:(
                               
                                  <>
                                  <button className='--btn' onClick={()=>decreaseCart(product)}>
                                      -
                                  </button>
                                  <p><b>{cart.cartQuantity}</b></p>
                                  <button className='--btn' onClick={()=>addToCart(product)}>
                                      +
                                  </button>
                                  </>
                                
                            )}
                           
                        </div>
                        <div className='--flex-start'>
                            {product?.quantity>0?(
                               <button className='--btn --btn-primary' onClick={()=>addToCart(product)}>
                                ADD TO CART
                               </button>
                            ):(
                                <button 
                                className='--btn --btn-red'
                                onClick={()=>toast.error("Sorry,product is out of stock")}
                                >
                                 OUT OF STOCKS
                                </button>
                            )}
                            <button className='--btn --btn-danger'>ADD TO WHISHLIST</button>
                        </div>
                        <div className='--underline'></div>
                        <div dangerouslySetInnerHTML={{
                     __html:DOMPurify.sanitize(
                        product?.description,200
                     )
                        }}></div>
                        
                    </div>
                </div>
                </>
            )}
            <Card cardClass={styles.card}>
                <h3>Product Review</h3>
            </Card>
        </div>
    </section>
  )
}

export default ProductDetails
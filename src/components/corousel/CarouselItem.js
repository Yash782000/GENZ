import React from 'react'
import "./Carousel.scss"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { shortenText } from '../../utlis'
import { ADD_TO_CART, saveCartDB } from '../../redux/features/cart/CartSlice';
import { useDispatch } from 'react-redux';

function removeHTMLTags(input){
   const regex = /<[^>]+>/g;
   return input.replace(regex,"");
}
function CarouselItem({url,name,price,description,regularPrice,product}) {
  const desc = removeHTMLTags(description);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCart = (product) =>{
    dispatch(ADD_TO_CART(product))
    navigate("/cart");
    dispatch(saveCartDB({cartItems:JSON.parse(localStorage.getItem("cartItems"))}));
  }
  return (
    <div className='carouselItem'>
        <Link to={`/product-details/${product._id}`}>
            <img className="product--image" src={url} alt="product"></img>
            <p className='price'>
            <span>{regularPrice>0 && <del>${regularPrice}</del>}</span>
              {`$${price}`}
              </p>
            <h4>{shortenText(name,18)}</h4>
            <p className='--mb'>{shortenText(desc,26)}</p>
        </Link>
        <button className='--btn --btn-primary --btn-block' onClick={()=>addToCart(product)}>Add To Cart</button>
    </div>
  )
}

export default CarouselItem
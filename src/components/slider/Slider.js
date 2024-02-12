import React, { useEffect, useState } from 'react'
import styles from "./Slider.scss"
import { AiFillAccountBook, AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from './slider-data';
import { useNavigate } from 'react-router-dom';
function Slider() {
    const navigate = useNavigate()
    const [currentSlide,setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    const autoScroll = true;
    let slideInterval;
    const intervalTIme = 5000;
    const prevSlide = () =>{
      setCurrentSlide(currentSlide === 0 ? slideLength-1 : currentSlide-1)
    }
    const nextSlide = () =>{
      setCurrentSlide(currentSlide === slideLength-1 ? 0 : currentSlide+1);
    }
    useEffect(function(){
      setCurrentSlide(0);
    },[])
    useEffect(function(){
      if(autoScroll){
        const auto = () =>{
          slideInterval = setInterval(nextSlide,5000)
        }
        auto();
      }
      
      return ()=> clearInterval(slideInterval);
    },[currentSlide,intervalTIme,autoScroll])
  return (
    <div className="slider">
        <AiOutlineArrowLeft  className='arrow prev' onClick={prevSlide}/>
        <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

        {sliderData.map((slider,index)=>{
            const {image,heading,desc} = slider;
            return(
                <div key={index} className={index === currentSlide ?
                "slide current" : "slide"}>
                     {index === currentSlide && (
                        <>
                        <img src={image} alt="slide"/>
                        <div className='content'>
                            <span className='span1'></span>
                            <span className='span2'></span>
                            <span className='span3'></span>
                            <span className='span4'></span>
                            <h2>{heading}</h2>
                            <p>{desc}</p>
                            <hr/>

                           <button className="--btn --btn-primary" onClick={()=>navigate("/shop")}>
                            Shop Now
                           </button>
                        </div>
                        </>
                     )}
                </div>
            )
        })}
    </div>
  )
}

export default Slider
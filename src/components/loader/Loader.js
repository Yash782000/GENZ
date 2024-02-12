import React from 'react'
import styles from "./Loader.module.scss"
import ReactDOM  from 'react-dom'
import LoaderImg from "../../assets/loader.gif"

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={LoaderImg} alt="img"/>
        </div>
    </div>,
    document.getElementById("loader")
  )
  
}

export const spinner = ()=>{
    return(
        <div className='--center-all'>
            
        </div>
    )
}

export default Loader
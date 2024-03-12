import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section style = {{height:"80vh"}}>
        <div className='--center-all'>
            <h2>Page not Found</h2>
            <p>It seems like the page are you looking for could not be found</p>
            <br/>
            <Link to={"/"}>
                <button className="--btn">Back to Home</button>
            </Link>
        </div>
    </section>
  )
}

export default NotFoundPage
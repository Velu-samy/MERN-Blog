import React from 'react'
import './Banner.css';
import { Link } from 'react-router-dom';
function Banner4() {
  return (
    <div>
      
      <div className='banner-container'>
        <Link to={'/register'} className="link lg:py-3  py-2  px-3  lg:px-5   hover:bg-transparent hover:text-white   text-purple relative    bg-slate-50  border-white border  ">ExploreNow</Link>
              </div>
    </div>
  )
}

export default Banner4

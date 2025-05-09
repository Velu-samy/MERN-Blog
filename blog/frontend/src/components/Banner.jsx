import React from 'react';
import one from '/1.png';
import two from '/2.png';
import third from '/3.png';
import four from '/4.png';
import { motion } from 'framer-motion';
function Banner() {
  return (
    <div className='flex justify-center'>
        <div className="flex   lg:mt-40 mt-20  p-3   justify-evenly shadow-lg   w-11/12  items-center gap-10">
     <motion.div  whileInView={{opacity:1}} initial={{opacity:0}}  transition={{duration:0.8,delaay:0.9}}      className="banner-b">
        <img src={one} alt="" className='lg:w-14 w-10' />
     </motion.div>
     <motion.div  whileInView={{opacity:1}} initial={{opacity:0}}  transition={{duration:0.8,delaay:0.9}}  className="banner-b">
        <img src={two} alt="" className='lg:w-14 w-10' />
     </motion.div>
     <motion.div  whileInView={{opacity:1}} initial={{opacity:0}}  transition={{duration:0.8,delaay:0.9}}  className="banner-b">
        <img src={third} alt="" className='lg:w-14 w-10' />
     </motion.div>
     <motion.div  whileInView={{opacity:1}} initial={{opacity:0}}  transition={{duration:0.8,delaay:0.9}}  className="banner-b">
        <img src={four} alt=""  className='lg:w-14 w-10'/>
     </motion.div>
    </div>

    </div>
  );
}

export default Banner;
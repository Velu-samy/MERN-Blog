import React, { useEffect, useState } from 'react';
import banner from '../assets/banner.png';
import banner1 from '../assets/banner-5.png';

function Banner2() {
  const [imageSrc, setImageSrc] = useState(banner);

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth <= 640) {
        setImageSrc(banner1);
      } else {
        setImageSrc(banner);
      }
    };

    window.addEventListener('resize', updateImage);
    updateImage(); // Initial check

    return () => window.removeEventListener('resize', updateImage);
  }, []);

  return (
    <div className="flex justify-center">
      <img src={imageSrc} alt="Banner" className="h-96 w-11/12 rounded-md my-10" />
    </div>
  );
}

export default Banner2;
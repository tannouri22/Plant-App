'use client'; 
import { useState } from 'react';
import Image from 'next/image';

interface ImageProps {
  image_url: string;
  id: number;
  copyright: string;
}

interface GalleryProps {
  images: ImageProps[];
}

const Gallery = ({ images }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle going to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Wrap around to the first image
  };

  // Handle going to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Wrap around to the last image
  };

  return (
    <div className="image-gallery">
        <div className="gallery-container">
        <button onClick={prevImage}> Previous </button>
      <Image 
        className="gallery-image" 
        height={300} 
        width={300} 
        src={images[currentIndex].image_url} 
        alt={`Image`} 
      />
      
      <button onClick={nextImage}>Next</button>
      </div>
    </div>
  );
};

export default Gallery;

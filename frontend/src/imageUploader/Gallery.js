import React from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

function Gallery({ images }) {
  return <ImageGallery items={images} />;
}

export default Gallery;
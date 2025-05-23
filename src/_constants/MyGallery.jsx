import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const MyGallery = ({ images, initialIndex }) => {
  // Convert your image URLs to the format expected by react-image-gallery

  console.log("initialIndex", initialIndex);
  const galleryItems = images?.map((image) => ({
    original: image.url || image,
    thumbnail: image.url || image,
  }));

  return (
    <div
      className="image-gallery-container"
      onClick={(e) => e.stopPropagation()}
    >
      <ImageGallery
        items={galleryItems || []}
        startIndex={initialIndex || 0}
        showPlayButton={false}
        showFullscreenButton={true}
        showThumbnails={false}
      />
    </div>
  );
};

export default MyGallery;

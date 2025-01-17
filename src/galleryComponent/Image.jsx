import React, { useState, useRef, useEffect } from "react";
import "./Image.css";
import Cropper from "react-easy-crop";
import { Slider, Button } from "@mui/material";
import { generateDownload } from "./cropImage";

const Image = ( ) => {
  const inputRef = useRef();

  const triggerFileSelectPopup = () =>
     inputRef.current.click();

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // useEffect(()=>{
  //   if(imageUrl){
  //     setImage(imageUrl)
  //   }
  // },[imageUrl])

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        console.log("Image Loaded: ", reader.result); // Debug log
        setImage(reader.result);
      });
    }
  };

  const onDownload = () => {
    if (image && croppedArea) {
      generateDownload(image, croppedArea);
    } else {
      console.error("No image or cropped area available for download");
    }
  };

  return (
    <div className="image_container">
      <div className="container-cropper">
        {image ? (
          <>
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="slider">
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
          </>
        ) : (
          <div>Please select an image to crop</div>
        )}
      </div>
      <div className="container-buttons">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={triggerFileSelectPopup}
          style={{ marginRight: "10px" }}
        >
          Choose
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onDownload}
          disabled={!image}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default Image;

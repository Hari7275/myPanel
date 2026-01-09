import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../cssfolder/ReactCropper.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const ReactCropper = ({ closeImageDelete_Modal }) => {
  const [cropData, setCropData] = useState("");
  const [cropCoords, setCropCoords] = useState({});
  const [rotate, setRotate] = useState(0);
  const [height] = useState(200);
  const [width] = useState(200);
  const cropperRef = useRef(null);

  const selectedImage = useSelector((state) => state.image.coverPhoto);
  const getCropData = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const canvas = cropperRef.current.cropper.getCroppedCanvas();
      const coords = cropperRef.current.cropper.getData();
      setCropData(canvas.toDataURL());
      setCropCoords(coords);
    }
  };

  const handleRotateForward = () => {
    setRotate(rotate + 5);
    if (cropperRef.current) {
      cropperRef.current.cropper.rotate(5);
    }
  };

  const handleRotateBackward = () => {
    setRotate(rotate - 5);
    if (cropperRef.current) {
      cropperRef.current.cropper.rotate(-5);
    }
  };

  const handleUpdate = () => {
    console.log("Updated cropped image data:", cropData);
    closeImageDelete_Modal();
  };

  return (
    <div className="reactCropper_container">
      <Cropper
        className="reactCropper_cropper"
        style={{ height: `${height}px`, width: `${width}px` }}
        initialAspectRatio={16 / 9}
        src={selectedImage}
        ref={cropperRef}
        viewMode={1}
        guides={true}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        checkOrientation={true}
        rotate={rotate}
        dragMode="move"
        cropBoxMovable={true}
        cropBoxResizable={true}
        minContainerWidth={10}
        minContainerHeight={50}
      />

      <div className="reactCropper_controls">
        <button className="reactCropper_button" onClick={getCropData}>
          Crop Image
        </button>
        <button className="reactCropper_button" onClick={handleRotateForward}>
          Rotate Image
        </button>
        <button className="reactCropper_button" onClick={handleRotateBackward}>
          Back Rotate Image
        </button>
      </div>

      {cropData && (
        <div className="reactCropper_image-container">
          <div className="reactCropper_image-box">
            <img className="reactCropper_image" src={cropData} alt="cropped" />
          </div>
        </div>
      )}
      {cropData && (
        <div className="reactCropper_input-container">
          <input
            className="reactCropper_input"
            value={`x1: ${cropCoords.x}, y1: ${cropCoords.y}, x2: ${
              cropCoords.x + cropCoords.width
            }, y2: ${cropCoords.y + cropCoords.height}, width: ${
              cropCoords.width
            }, height: ${cropCoords.height}`}
            readOnly
          />
        </div>
      )}
      {cropData && (
        <div className="container-buttons">
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
            onClick={handleUpdate}
          >
            Update
          </Button>

          <Button variant="contained" color="secondary">
            Download
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReactCropper;

import React, { useRef, useState, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../../../cssfolder/ReactCropper.css";
import { Button } from "@mui/material";
import ReactModal from "react-modal";
import { useUpdateConsultantGalleryMutation } from "../../../_store/api";

const ImageCropper = ({ isOpen, onClose, selectedImage, caller }) => {
  const [imageUrl, setImageUrl] = useState(selectedImage.url);
  const [cropData, setCropData] = useState("");
  const [rotate, setRotate] = useState(0);
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);
  const [isCropped, setIsCropped] = useState(false);

  const cropperRef = useRef(null);

  const [update, { isLoading, isError }] = useUpdateConsultantGalleryMutation();

  useEffect(() => {
    if (imageUrl) {
      setCropData(imageUrl);
    }
  }, [imageUrl]);

  const getCropData = () => {
    if (cropperRef?.current && cropperRef?.current?.cropper) {
      const canvas = cropperRef?.current?.cropper?.getCroppedCanvas();
      setCropData(canvas?.toDataURL());
      setIsCropped(true);
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

  const handleUpdate = async () => {
    if (!cropData) {
      console.log("No crop data available to update.");
      return;
    }

    const formData = new FormData();
    const blob = await (await fetch(cropData)).blob();
    formData.append("file", blob, "cropped_image.png");

    try {
      await update({
        id: selectedImage.id,
        body: formData,
      });

      console.log("Updated cropped image successfully.");
      onClose();
    } catch (error) {
      console.error("Failed to update cropped image:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        <div className="reactCropper_container">
          {imageUrl && (
            // <Cropper
            //   className="reactCropper_cropper"
            //   style={{ height: `${height}px`, width: `${width}px` }}
            //   initialAspectRatio={1 / 1}
            //   src={imageUrl}
            //   ref={cropperRef}
            //   viewMode={1}
            //   guides={true}
            //   minCropBoxHeight={10}
            //   minCropBoxWidth={10}
            //   background={false}
            //   responsive={true}
            //   checkOrientation={true}
            //   rotate={rotate}
            //   dragMode="move"
            //   cropBoxMovable={true}
            //   cropBoxResizable={true}
            //   minContainerWidth={100}
            //   minContainerHeight={100}
            // />
            <Cropper
              className="reactCropper_cropper"
              style={{ height: `${height}px`, width: `${width}px` }}
              src={imageUrl}
              ref={cropperRef}
              viewMode={1} // Ensures the crop box stays within the container
              guides={true}
              background={false}
              responsive={true}
              checkOrientation={true}
              aspectRatio={1 / 1} // Maintain fixed aspect ratio
              dragMode="move" // Allows moving the image
              cropBoxResizable={true} // Allows resizing the crop box
              cropBoxMovable={true} // Allows moving the crop box
              minCropBoxWidth={100} // Set minimum crop box width
              minCropBoxHeight={100} // Set minimum crop box height
            />
          )}

          <div className="reactCropper_controls">
            <button className="reactCropper_button" onClick={getCropData}>
              Crop Image
            </button>
            <button
              className="reactCropper_button"
              onClick={handleRotateForward}
            >
              Rotate Image
            </button>
            <button
              className="reactCropper_button"
              onClick={handleRotateBackward}
            >
              Back Rotate Image
            </button>
          </div>

          {cropData && (
            <div className="reactCropper_image-container">
              <div className="reactCropper_image-box">
                <img
                  className="reactCropper_image"
                  src={cropData}
                  alt="cropped"
                />
              </div>
            </div>
          )}

          {cropData && (
            <div className="container-buttons">
              {caller === "AstrologerGallery" && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    onClick={handleUpdate}
                    disabled={!isCropped || isLoading}
                  >
                    {isLoading ? "Updating" : "Update"}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </ReactModal>
    </>
  );
};

export default ImageCropper;

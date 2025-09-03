import React, { useRef, useState, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../../../cssfolder/ReactCropper.css";
import { Button } from "@mui/material";
import ReactModal from "react-modal";
import { useUpdateUserGalleryMutation } from "../../../_store/api";

const ImageCropper = ({
  isOpen,
  onClose,
  imageUrl,
  photoType,
  photoId,
  onUpdate,
}) => {
  const [cropData, setCropData] = useState("");
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);
  const cropperRef = useRef(null);
  const [updateUserGallery] = useUpdateUserGalleryMutation();

  const getCropData = () => {
    if (cropperRef?.current?.cropper) {
      const canvas = cropperRef.current.cropper.getCroppedCanvas();
      setCropData(canvas.toDataURL());
    }
  };

  const handleRotateForward = () => {
    if (cropperRef?.current?.cropper) {
      cropperRef.current.cropper.rotate(5);
    }
  };

  const handleRotateBackward = () => {
    if (cropperRef?.current?.cropper) {
      cropperRef.current.cropper.rotate(-5);
    }
  };

  const handleUpdate = async () => {
    if (!cropData) {
      console.error("No image data to upload.");
      return;
    }

    try {
      const byteString = atob(cropData.split(",")[1]);
      const mimeString = cropData.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "cropped-image.jpg", { type: mimeString });

      const formData = new FormData();
      formData.append("photo_type", photoType);
      formData.append("photo_id", photoId);
      formData.append("image", file);

      const response = await updateUserGallery({ formData }).unwrap();

      console.log("Image updated successfully:", response);

      if (onUpdate) {
        onUpdate({
          id: photoId,
          url: response.data.url,
        });
      }

      onClose();
    } catch (error) {
      console.error("Failed to update image:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    if (imageUrl) {
      setCropData(imageUrl);
    }
  }, [imageUrl]);

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="reactCropper_container">
        {imageUrl && (
          <Cropper
            className="reactCropper_cropper"
            style={{ height: `${height}px`, width: `${width}px` }}
            initialAspectRatio={1 / 1}
            src={imageUrl}
            ref={cropperRef}
            crossOrigin="anonymous"
            viewMode={1}
            guides={true}
            // minCropBoxHeight={10}
            // minCropBoxWidth={10}
            background={false}
            responsive={true}
            checkOrientation={true}
            dragMode="move"
            cropBoxMovable={true}
            cropBoxResizable={true}
            minContainerWidth={10}
            minContainerHeight={50}
            minCropBoxWidth={100} // Set minimum crop box width
            minCropBoxHeight={100} // Set minimum crop box heights
          />
        )}

        <div className="reactCropper_controls">
          <button className="reactCropper_button" onClick={getCropData}>
            Crop Image
          </button>
          <button className="reactCropper_button" onClick={handleRotateForward}>
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

        <div className="reactCropper_footer">
          <>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        </div>
      </div>
    </ReactModal>
  );
};

export default ImageCropper;

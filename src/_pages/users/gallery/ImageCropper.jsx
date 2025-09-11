import React, { useRef, useState, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../../../cssfolder/ReactCropper.css";
import { Button } from "@mui/material";
import ReactModal from "react-modal";
import {
  useUpdateUserGalleryMutation,
  useUpdateUserFaceAreaMutation,
} from "../../../_store/api";

import toast from "react-hot-toast";

const ImageCropper = ({
  isOpen,
  onClose,
  imageUrl,
  photoType,
  photoId,
  onUpdate,
  isFaceAreaMode = false, // New prop to determine which API to use
}) => {
  const [cropData, setCropData] = useState("");
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);
  const cropperRef = useRef(null);
  const [updateUserGallery] = useUpdateUserGalleryMutation();
  const [updateUserFaceArea] = useUpdateUserFaceAreaMutation();
  const [cropCoords, setCropCoords] = useState({});

  const getCropData = () => {
    if (cropperRef?.current?.cropper) {
      const canvas = cropperRef.current.cropper.getCroppedCanvas();
      const coords = cropperRef.current.cropper.getData();
      setCropCoords(coords);
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
    if (!cropData && !isFaceAreaMode) {
      console.error("No image data to upload.");
      return;
    }

    try {
      if (isFaceAreaMode) {
        // Handle face area update
        const faceAreaData = {
          face_area: [
            {
              x1: cropCoords.x,
              y1: cropCoords.y,
              x2: cropCoords.x + cropCoords.width,
              y2: cropCoords.y + cropCoords.height,
              width: cropCoords.width,
              height: cropCoords.height,
            },
          ],
          is_facearea_set: true,
        };

        console.log("faceAreaData", faceAreaData);

        // return;

        const response = await updateUserFaceArea({
          photo_id: photoId,
          formData: faceAreaData,
        }).unwrap();

        if (response.status) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }

        if (onUpdate) {
          onUpdate({
            id: photoId,
            faceAreaData: faceAreaData.face_area[0],
            ...response.data,
          });
        }
      } else {
        // Handle regular gallery image update
        const byteString = atob(cropData.split(",")[1]);
        const mimeString = cropData.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], "cropped-image.jpg", {
          type: mimeString,
        });

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
      }

      onClose();
    } catch (error) {
      console.error("Failed to update:", error);
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
            background={false}
            responsive={true}
            checkOrientation={true}
            dragMode="move"
            cropBoxMovable={true}
            cropBoxResizable={true}
            minContainerWidth={10}
            minContainerHeight={50}
            minCropBoxWidth={100}
            minCropBoxHeight={100}
          />
        )}

        <div className="reactCropper_controls">
          <button className="reactCropper_button" onClick={getCropData}>
            {isFaceAreaMode ? "Set Face Area" : "Crop Image"}
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

        {cropCoords && cropCoords.x !== undefined && (
          <div className="reactCropper_input-container">
            <input
              className="reactCropper_input"
              value={`x1: ${cropCoords.x?.toFixed(
                2
              )}, y1: ${cropCoords.y?.toFixed(2)}, x2: ${(
                cropCoords.x + cropCoords.width
              )?.toFixed(2)}, y2: ${(cropCoords.y + cropCoords.height)?.toFixed(
                2
              )}, width: ${cropCoords.width?.toFixed(
                2
              )}, height: ${cropCoords.height?.toFixed(2)}`}
              readOnly
            />
          </div>
        )}

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
              disabled={isFaceAreaMode ? !cropCoords.x : !cropData}
            >
              {isFaceAreaMode ? "Update Face Area" : "Update"}
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

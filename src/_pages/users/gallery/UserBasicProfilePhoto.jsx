import React, { useState, useRef, useEffect } from "react";
import "../../../cssfolder/GalleryComponent.css";

import ImageCropper from "./ImageCropper";
import DeleteComponent from "../../payments/DeleteComponent";
import { Trash } from "lucide-react";

import {
  useGetUserListQuery,
  useCreateUserBasicInfoImageMutation,
  useDeleteUserBasicPhotoMutation,
} from "../../../_store/api";

import { useSelector } from "react-redux";

import MyGallery from "../../../_constants/MyGallery";
import toast from "react-hot-toast";

const UserBasicProfilePhoto = () => {
  const userId = useSelector((state) => state.user.userData);
  const { data: fetchData } = useGetUserListQuery(userId);
  const [addImage, { isLoading }] = useCreateUserBasicInfoImageMutation();

  const [imageUrls, setImageUrls] = useState([]);

  const [showImageCropper, setShowImageCropper] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [consultantId, setConsultantId] = useState(null);

  const fileInputRef = useRef(null);
  // state to open image as popup
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [deleteImage] = useDeleteUserBasicPhotoMutation();
  const [InfoUserId, setInfoUserId] = useState(null);

  useEffect(() => {
    if (fetchData) {
      const urls = fetchData?.data?.profileDetails?.profile_image_url;
      const userId = fetchData?.data?.profileDetails?.id;

      // Ensure imageUrls is always an array
      setImageUrls(Array.isArray(urls) ? urls : urls ? [{ url: urls, id: userId }] : []);
      setInfoUserId(userId);
    }
  }, [fetchData]);

  // consultant id for add image
  useEffect(() => {
    if (fetchData) {
      setConsultantId(fetchData?.data?.id);
    }
  }, [fetchData]);

  const toggleImageCropper = (photo) => {
    setShowImageCropper(!showImageCropper);
    setSelectedRow(photo);
  };

  const handleUploadImage = () => {
    fileInputRef?.current?.click();
  };

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleFileChange = async (event) => {
    const file = event?.target?.files[0];
    if (file) {
      const formData = new FormData();
      formData?.append("image", file);

      try {
        const response = await addImage({
          id: consultantId,
          body: formData,
        }).unwrap();

        if (response?.status) {
          toast.success(response.message);
          
          // Add the new image with proper structure
          const newImage = {
            url: response?.data?.url || URL.createObjectURL(file),
            id: response?.data?.id || Date.now(),
          };
          
          setImageUrls((prevUrls) => [...prevUrls, newImage]);
        } else {
          toast.error(response.message);
        }

        // Reset file input
        fileInputRef.current.value = null;
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed");
      }
    }
  };

  const handleImageUpdate = (updatedPhoto) => {
    setImageUrls((prevUrls) =>
      prevUrls.map((photo) =>
        photo.id === updatedPhoto.id
          ? { ...photo, url: updatedPhoto.url }
          : photo
      )
    );
  };

  // api handling for delete image
  const handleDelete = async () => {
    if (selectedRow && selectedRow.id) {
      try {
        const deleteResponse = await deleteImage({
          id: InfoUserId,
          imageId: selectedRow.id, // Include image ID if needed by API
        }).unwrap();

        if (deleteResponse.status) {
          toast.success(deleteResponse.message);
          // Remove the deleted image from state
          setImageUrls((prevUrls) =>
            prevUrls.filter((photo) => photo.id !== selectedRow.id)
          );
          setShowDeleteComponent(false);
        } else {
          toast.error(deleteResponse.message);
        }
      } catch (error) {
        console.error("Failed to delete the image:", error);
        toast.error("Failed to delete the image");
      }
    }
  };

  const popupImage = (image, index) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
  };

  return (
    <>
      {showGallery && (
        <div className="gallery-modal" onClick={() => setShowGallery(false)}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <MyGallery images={imageUrls} initialIndex={currentImageIndex} />
          </div>
        </div>
      )}

      <div className="ProfileData-container">
        <div>
          <h3 className="ProfileData-subheading">Basic Profile Photo</h3>
          <div className="gallery-maincontainer">
            <div className="gallery-grid">
              <div className="addImageContainer common-height">
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "50%",
                    textAlign: "center",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleUploadImage}
                >
                  <span style={{ fontSize: "35px", cursor: "pointer" }}>+</span>
                </div>
              </div>
              
              {imageUrls?.map((photo, index) => (
                <div className="image-container" key={photo.id || index}>
                  <img
                    src={photo?.url}
                    alt={`Image ${index + 1}`}
                    onClick={() => popupImage(photo, index)}
                    style={{ cursor: "pointer" }}
                  />

                  <div className="galleryIcons">
                    {/* <span onClick={() => toggleImageCropper(photo)}>
                      <img src="/cropAdmin.png" alt="Crop" className="galleryIcon" />
                    </span> */}
                    <span onClick={() => toggleDeleteComponent(photo)}>
                      <Trash />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {showImageCropper && selectedRow && (
          <ImageCropper
            isOpen={showImageCropper}
            onClose={toggleImageCropper}
            imageUrl={selectedRow.url}
            photoType={selectedRow.photo_type}
            photoId={selectedRow.id}
            onUpdate={handleImageUpdate}
          />
        )}
        
        {showDeleteComponent && selectedRow && (
          <DeleteComponent
            isOpen={showDeleteComponent}
            onClose={toggleDeleteComponent}
            onDelete={handleDelete}
          />
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
    </>
  );
};

export default UserBasicProfilePhoto;
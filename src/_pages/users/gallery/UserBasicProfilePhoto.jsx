import React, { useState, useRef, useEffect } from "react";
import "../../../cssfolder/GalleryComponent.css";

import ImageCropper from "./ImageCropper";
import DeleteComponent from "../../payments/DeleteComponent";
import {
  useGetUserListQuery,
  useCreateUserBasicInfoImageMutation,
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

  const [consultantId, setConsultantId] = useState([]);

  const fileInputRef = useRef(null);
  // state to open image as popup
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    if (fetchData) {
      const urls = fetchData?.data?.profileDetails?.profile_image_url;
      setImageUrls(urls);
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
        } else {
          toast.error(response.message);
        }

        // Directly update the imageUrls state
        setImageUrls((prevUrls) => [
          ...prevUrls,
          {
            url: URL.createObjectURL(file),
          },
        ]);

        // Reset file input
        fileInputRef.current.value = null;
      } catch (error) {
        console.error("Image upload failed:", error);
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

  const popupImage = (image, index) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
  };

  return (
    <>
      {showGallery && (
        <div className="gallery-modal" onClick={() => setShowGallery(false)}>
          <div className="gallery-modal-content">
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
                  }}
                  onClick={handleUploadImage}
                >
                  <span style={{ fontSize: "35px", cursor: "pointer" }}>+</span>
                </div>
              </div>
              {/* {imageUrls?.map((photo, index) => ( */}
              <div className="image-container">
                <img
                  // src={photo?.url}
                  src={imageUrls}
                  alt={`Image`}
                  onClick={() => popupImage(imageUrls)}
                  style={{ cursor: "pointer" }}
                />

                {/* <div className="galleryIcons">
                  <span onClick={() => toggleImageCropper(imageUrls)}>
                    <img src="/cropAdmin.png" className="galleryIcon" />
                  </span>
                </div> */}
              </div>
              {/* ))} */}
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

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};

export default UserBasicProfilePhoto;

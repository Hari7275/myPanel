import React, { useState, useRef, useEffect } from "react";
import "../../../cssfolder/GalleryComponent.css";
import { Trash, Settings, UserRound, CirclePlus, Download } from "lucide-react";
import ImageCropper from "./ImageCropper";
import DeleteComponent from "../../payments/DeleteComponent";
import {
  useGetUserListQuery,
  useCreateUserGalleryMutation,
  useDeleteUserGalleryMutation,
} from "../../../_store/api";
import UserSettings from "./UserSettings";
import ProfilePhoto from "./ProfilePhoto";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import MyGallery from "../../../_constants/MyGallery";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UserGallery = () => {
  // const userId = useSelector((state) => state.user.userData);
  const { userId } = useParams();

  const { data: fetchData } = useGetUserListQuery(userId);
  const [addImage, { isLoading }] = useCreateUserGalleryMutation();
  const [deleteImage] = useDeleteUserGalleryMutation();

  const [openSetting, setOpenSetting] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageStatuses, setImageStatuses] = useState({});
  const [consultantId, setConsultantId] = useState([]);
  const [profilePic, setProfilePic] = useState(false);
  const fileInputRef = useRef(null);
  // state to open image as popup
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    if (fetchData) {
      const urls = fetchData?.data?.other_photos?.map((photo) => ({
        url: photo?.url,
        photo_type: photo?.photo_type,
        id: photo?.id,
        status: photo?.status,
      }));
      setImageUrls(urls);

      setImageStatuses(
        urls?.reduce((acc, photo) => {
          acc[photo?.url] = photo?.status;
          return acc;
        }, {})
      );
    }
  }, [fetchData]);

  // consultant id for add image
  useEffect(() => {
    if (fetchData) {
      setConsultantId(fetchData?.data?.id);
    }
  }, [fetchData]);

  const toggleSettingModal = (url) => {
    setSelectedImage(url);
    setOpenSetting(!openSetting);
  };

  const toggleImageCropper = (photo) => {
    setShowImageCropper(!showImageCropper);
    setSelectedRow(photo);
  };

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
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

        // Update imageStatuses state with the new image status
        setImageStatuses((prevStatuses) => ({
          ...prevStatuses,
          [URL.createObjectURL(file)]: response?.data?.status, // Update status here
        }));

        // Reset file input
        fileInputRef.current.value = null;
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  // api handeling for delete image
  const handleDelete = async () => {
    if (selectedRow && selectedRow.id) {
      try {
        const deleteResponse = await deleteImage({
          id: selectedRow.id,
        }).unwrap();

        if (deleteResponse.status) {
          toast.success(deleteResponse.message);
        } else {
          toast.error(deleteResponse.message);
        }

        // Remove the deleted image from imageUrls and imageStatuses
        setImageUrls((prevUrls) =>
          prevUrls.filter((photo) => photo.id !== selectedRow.id)
        );
      } catch (error) {
        toast.error(`${error?.data?.message}. Please log in again.`);
      }
    }
  };

  const handleUpdateStatus = (url, newStatus) => {
    setImageStatuses((prevStatuses) => ({
      ...prevStatuses,
      [url]: newStatus,
    }));
  };

  const handleImageUpdate = (updatedPhoto) => {
    setImageUrls((prevUrls) =>
      prevUrls.map((photo) =>
        photo.id === updatedPhoto.id
          ? { ...photo, url: updatedPhoto.url }
          : photo
      )
    );

    setImageStatuses((prevStatuses) => ({
      ...prevStatuses,
      [updatedPhoto.url]: prevStatuses[selectedRow.url],
    }));
  };

  // update profile pic

  const toggleProfilePic = (photo) => {
    setSelectedRow(photo);
    setProfilePic(!profilePic);
  };

  // function for download image

  const downloadImage = (url) => {
   
    saveAs(url, "image.jpg");
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
            {/* <span
                  className="close-button"
                  onClick={() => setShowGallery(false)}
                >
                  &times;
                </span> */}
            <MyGallery images={imageUrls} initialIndex={currentImageIndex} />
          </div>
        </div>
      )}

      <div className="ProfileData-container">
        <div>
          <h3 className="ProfileData-subheading">Gallery group </h3>
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
              {imageUrls?.map((photo, index) => (
                <div key={index} className="image-container">
                  <img
                    src={photo?.url}
                    alt={`Image ${index + 1}`}
                    onClick={() => popupImage(photo, index)}
                    style={{ cursor: "pointer" }}
                  />

                  <div className="topnav">
                    {imageStatuses[photo?.url] && (
                      <a
                        className={`topnav-${imageStatuses[
                          photo?.url
                        ].toLowerCase()}`}
                      >
                        {imageStatuses[photo?.url]}
                      </a>
                    )}
                  </div>
                  <div className="galleryIcons">
                    <span onClick={() => toggleImageCropper(photo)}>
                      {/* <UserRound /> */}
                      <img src="/cropAdmin.png" className="galleryIcon" />
                    </span>
                    <span onClick={() => downloadImage(photo.url)} download>
                      <Download />
                    </span>
                    <span onClick={() => toggleSettingModal(photo)}>
                      <Settings />
                    </span>
                    <span onClick={() => toggleDeleteComponent(photo)}>
                      <Trash />
                    </span>
                    <span onClick={() => toggleProfilePic(photo)}>
                      <CirclePlus />
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

        {profilePic && (
          <ProfilePhoto
            isOpen={profilePic}
            onClose={toggleProfilePic}
            userId={consultantId}
            photoId={selectedRow.id}
            imageUrl={selectedRow.url}
          />
        )}

        {openSetting && selectedImage && (
          <UserSettings
            isOpen={openSetting}
            onClose={toggleSettingModal}
            imageData={selectedImage}
            currentStatus={imageStatuses[selectedImage]}
            onUpdateStatus={handleUpdateStatus}
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

export default UserGallery;

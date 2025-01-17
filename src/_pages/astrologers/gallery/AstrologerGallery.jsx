import React, { useState, useRef, useEffect } from "react";
import "../../../cssfolder/GalleryComponent.css";
import { Trash, UserRound, Download, Settings, CirclePlus } from "lucide-react";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";

import AstrologerSettings from "./AstrologerSettings"
import ImageCropper from "./ImageCropper";

import {
  useDeleteGalleryMutation,
  useCreateConsultantGalleryMutation,
} from "../../../_store/api";
import { ConsultantGalleryStatus } from "../../../_constants/consultantConstant";
import DeleteComponent from "../../payments/DeleteComponent";
import ProfilePhoto from "./ProfilePhoto";

import { useGetGalleryListQuery } from "../../../_store/api";

const AstrologerGallery = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openImageCropper, setOpenImageCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageStatuses, setImageStatuses] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [profilePic, setProfilePic] = useState(false);

  const fileInputRef = useRef(null);

  const consultantId = useSelector((state) => state.consultant.consultantData);

  const { data: fetchData } = useGetGalleryListQuery(consultantId);

  const [addImage, { isLoading }] = useCreateConsultantGalleryMutation();

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.other) {
      setImageUrls(fetchData?.data?.other);
    }
  }, [fetchData]);

  useEffect(() => {
    if (imageUrls) {
      // Map the status values using the ConsultantGalleryStatus constant
      setImageStatuses(
        imageUrls.map((result) => ConsultantGalleryStatus(result.status))
      );
    }
  }, [imageUrls]);

  const [deleteImage] = useDeleteGalleryMutation();

  const toggleSettingModal = (url) => {
    setSelectedImage(url);
    setOpenSetting(!openSetting);
  };

  const toggleImageCropper = (url) => {
    setSelectedImage(url);
    setOpenImageCropper(!openImageCropper);
  };

  const handleStatusChange = (url, status) => {
    setImageStatuses((prevStatuses) => ({
      ...prevStatuses,
      [url]: status,
    }));
  };

  // function for download image

  const downloadImage = (url) => {
    saveAs(url, "image.jpg");
  };

  const handleUploadImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await addImage({
          id: consultantId,
          body: formData,
        }).unwrap();

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
          [URL.createObjectURL(file)]: response.data.status, // Update status here
        }));

        // Reset file input
        fileInputRef.current.value = null;
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleImageLoad = (url) => {
    setLoadedImages((prevLoadedImages) => ({
      ...prevLoadedImages,
      [url]: true,
    }));
  };

  // logic for delete image

  const toggleDeleteComponent = (row) => {
    setSelectedImage(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  // api handeling for delete image
  const handleDelete = async () => {
    if (selectedImage && selectedImage.id) {
      try {
        await deleteImage({ id: selectedImage.id }).unwrap();

        // Remove the deleted image from imageUrls and imageStatuses
        setImageUrls((prevUrls) =>
          prevUrls.filter((photo) => photo.id !== selectedImage.id)
        );
      } catch (error) {
        console.error("Failed to delete the image:", error);
      }
    }
  };

  // *********************************** update profile pic *******************************************

  const toggleProfilePic = (photo) => {
    setSelectedImage(photo);
    setProfilePic(!profilePic);
  };
  return (
    <>
      <div className="ProfileData-card">
        <h3 className="ProfileData-subheading">Other Photos</h3>
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
              >
                <span
                  style={{ fontSize: "35px", cursor: "pointer" }}
                  onClick={handleUploadImage}
                >
                  +
                </span>
              </div>
            </div>

            {imageUrls &&
              imageUrls.map((image, index) => (
                <div key={index} className="image-container">
                  <img
                    src={image.url}
                    alt={`Product Image ${index + 1}`}
                    onLoad={() => handleImageLoad(image.url)}
                  />

                  {loadedImages[image.url] && (
                    <>
                      {/* <div className="hover-buttons">
                        <button className="hover-button">
                          <Trash />
                        </button>
                      </div> */}
                      <div className="topnav">
                        {imageStatuses[index] && (
                          <a
                            className={`topnav-${imageStatuses[
                              index
                            ].toLowerCase()}`}
                          >
                            {imageStatuses[index]}
                          </a>
                        )}
                      </div>

                      <div className="galleryIcons">
                        <span>
                          <UserRound
                            onClick={() => toggleImageCropper(image)}
                          />
                        </span>
                        <span>
                          <Download onClick={() => downloadImage(image.url)} />
                        </span>
                        <span onClick={() => toggleProfilePic(image)}>
                          <CirclePlus />
                        </span>
                        <span onClick={() => toggleSettingModal(image)}>
                          <Settings />
                        </span>
                        <span onClick={() => toggleDeleteComponent(image)}>
                          <Trash />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>

        {openSetting && selectedImage && (
          <AstrologerSettings
            isOpen={openSetting}
            onClose={toggleSettingModal}
            imageUrl={selectedImage}
            currentStatus={selectedImage.status}
            onStatusChange={handleStatusChange}
          />
        )}
        {openImageCropper && selectedImage && (
          <ImageCropper
            isOpen={openImageCropper}
            onClose={toggleImageCropper}
            selectedImage={selectedImage}
            caller="AstrologerGallery"
          />
        )}

        {profilePic && (
          <ProfilePhoto
            isOpen={profilePic}
            onClose={toggleProfilePic}
            selectedImage={selectedImage}
          />
        )}

        {showDeleteComponent && selectedImage && (
          <DeleteComponent
            isOpen={showDeleteComponent}
            onClose={toggleDeleteComponent}
            imageUrl={selectedImage}
            onDelete={handleDelete}
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
export default AstrologerGallery;

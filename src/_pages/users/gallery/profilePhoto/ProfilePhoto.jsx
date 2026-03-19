import React, { useState, useRef, useEffect } from "react";
import { Settings, Trash, Crop } from "lucide-react";
import {
  useDeleteUserGalleryMutation,
  useGetUserListQuery,
} from "../../../../_store/api";
import { useUpdateUserFaceAreaMutation } from "../../../../_store/api";
import UserSettings from "../UserSettings";
import { useSelector } from "react-redux";
import ImageCropper from "../ImageCropper";
import toast from "react-hot-toast";
import DeleteComponent from "../../../payments/DeleteComponent";
import { useParams } from "react-router-dom";

// Component to display cropped face area
const FaceAreaImage = ({ imageUrl, faceArea }) => {
  const canvasRef = useRef(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  useEffect(() => {
    if (imageUrl && faceArea && faceArea.length > 0) {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          const area = faceArea[0];

          // Set canvas dimensions to match the face area
          canvas.width = area.width;
          canvas.height = area.height;

          // Draw the cropped area
          ctx.drawImage(
            img,
            area.x1, // source x
            area.y1, // source y
            area.width, // source width
            area.height, // source height
            0, // destination x
            0, // destination y
            area.width, // destination width
            area.height // destination height
          );

          // Convert canvas to data URL
          setCroppedImageUrl(canvas.toDataURL());
        }
      };

      img.src = imageUrl;
    }
  }, [imageUrl, faceArea]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {croppedImageUrl && (
        <img
          src={croppedImageUrl}
          alt="Face Area"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
          crossOrigin="anonymous"
        />
      )}
    </>
  );
};

const UserProfilePhoto = () => {
  // const userId = useSelector((state) => state?.user?.userData);
  const { userId } = useParams();

  const { data: fetchData } = useGetUserListQuery(userId);
  const [openSetting, setOpenSetting] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageStatuses, setImageStatuses] = useState({});
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);

  const [deleteImage] = useDeleteUserGalleryMutation();

  useEffect(() => {
    if (fetchData) {
      const urls = fetchData?.data?.profile_images?.map((photo) => ({
        url: photo?.url,
        reject_note: photo?.reject_note,
        id: photo?.id,
        status: photo?.status,
        face_area: photo.face_area,
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

  console.log("imageUrls", imageUrls);

  const toggleImageCropper = (photo) => {
    setShowImageCropper(!showImageCropper);
    setSelectedRow(photo);
  };

  const toggleSettingModal = (url) => {
    setSelectedImage(url);
    setOpenSetting(!openSetting);
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
          ? {
              ...photo,
              url: updatedPhoto.url || photo.url,
              face_area: updatedPhoto.faceAreaData
                ? [updatedPhoto.faceAreaData]
                : photo.face_area,
            }
          : photo
      )
    );
  };

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
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

  return (
    <>
      <div className="ProfileData-container" style={{ display: "flex" }}>
        <div className="ProfileData-card">
          <h3 className="ProfileData-subheading">Profile Photo Request</h3>
          <div className="gallery-maincontainer">
            <div className="gallery-gri">
              {imageUrls?.map((photo, index) => (
                <div key={index} className="image-container">
                  <img
                    src={photo?.url}
                    alt={`Image ${index + 1}`}
                    style={{
                      height: "460px",
                      borderRadius: "10px 10px 0px 0px",
                      border: "1px solid #ddd",
                    }}
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
                      <Crop className="galleryIcon" />
                    </span>

                    <span onClick={() => toggleSettingModal(photo)}>
                      <Settings />
                    </span>
                    <span onClick={() => toggleDeleteComponent(photo)}>
                      <Trash />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="ProfileData-card"
          style={{
            marginLeft: "20%",
          }}
        >
          <h3 className="ProfileData-subheading">Face Area Photo</h3>
          <div className="gallery-maincontainer">
            <div className="gallery-gri">
              {imageUrls?.map((photo, index) => (
                <div
                  key={index}
                  className="image-container"
                  style={{ height: "460px" }}
                >
                  {photo?.face_area && photo.face_area.length > 0 ? (
                    <FaceAreaImage
                      imageUrl={photo.url}
                      faceArea={photo.face_area}
                    />
                  ) : (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <p style={{ color: "#999" }}>No face area set</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {openSetting && selectedImage && (
          <UserSettings
            isOpen={openSetting}
            onClose={toggleSettingModal}
            imageData={selectedImage}
            currentStatus={imageStatuses[selectedImage]}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {showImageCropper && selectedRow && (
          <ImageCropper
            isOpen={showImageCropper}
            onClose={toggleImageCropper}
            imageUrl={selectedRow.url}
            photoType={selectedRow.photo_type}
            photoId={selectedRow.id}
            onUpdate={handleImageUpdate}
            isFaceAreaMode={true}
          />
        )}

        {showDeleteComponent && selectedRow && (
          <DeleteComponent
            isOpen={showDeleteComponent}
            onClose={toggleDeleteComponent}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default UserProfilePhoto;

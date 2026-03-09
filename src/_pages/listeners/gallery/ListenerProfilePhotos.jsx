import React, { useState, useRef, useEffect } from "react";
import "../../../cssfolder/GalleryComponent.css";
import { useCreateConsultantCoverPhotoMutation } from "../../../_store/api";
import {
  useGetGalleryListQuery,
  useDeleteGalleryMutation,
} from "../../../_store/api";
import DeleteComponent from "../../payments/DeleteComponent";
import { Trash } from "lucide-react";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { useTheme } from "../../../_context/ThemeContext";

const ListenerProfilePhotos = () => {
  const { isDarkMode } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);

  const inputRef = useRef(null);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

  const [addImage, { isLoading }] = useCreateConsultantCoverPhotoMutation();
  const { data: fetchData } = useGetGalleryListQuery(consultantId);
  const [deleteImage, { isLoading: isDeleting }] = useDeleteGalleryMutation();
  const permissions = usePermissions();

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data?.cover_image);
    }
  }, [fetchData]);

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

        if (response.status) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
          return;
        }

        // Reset file input
        inputRef.current.value = null;
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleUploadImage = () => {
    inputRef.current.click();
  };

  const toggleDeleteComponent = (row) => {
    setSelectedImage(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = async () => {
    if (selectedImage && selectedImage?.id) {
      try {
        await deleteImage({ id: selectedImage?.id }).unwrap();
      } catch (error) {
        console.error("Failed to delete the image:", error);
      }
    }
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <div className="ProfileData-card">
          <h3 className="ProfileData-subheading">Cover Photo</h3>
          <div className="gallery-maincontainer">
            <div className="gallery-grid">
              {/* Add Image Button */}
              <div className="addImageContainer" style={{ height: "320px" }}>
                <div
                  style={{
                    background: "var(--card-bg)",
                    borderRadius: "50%",
                    textAlign: "center",
                    width: "50px",
                    height: "50px",
                    cursor: "pointer",
                  }}
                  onClick={handleUploadImage}
                >
                  <span style={{ fontSize: "35px" }}>+</span>
                </div>
              </div>

              {data ? (
                <div
                  className="image-container common-height"
                  style={{ height: "320px" }}
                >
                  <img
                    src={data?.url}
                    alt="Selected"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {permissions?.["listener"]?.includes(
                    "update_listener_profile_gallery"
                  ) && (
                    <div className="hover-buttons">
                      <button
                        className="hover-button"
                        onClick={() => toggleDeleteComponent(data)}
                      >
                        <Trash />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p>No cover photo available</p>
              )}
            </div>
          </div>
        </div>

        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {showDeleteComponent && selectedImage && (
          <DeleteComponent
            isOpen={showDeleteComponent}
            onClose={toggleDeleteComponent}
            imageUrl={selectedImage}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}
      </div>
    </>
  );
};

export default ListenerProfilePhotos;

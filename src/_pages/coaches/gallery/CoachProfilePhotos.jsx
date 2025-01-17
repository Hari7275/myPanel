import React, { useState, useRef, useEffect } from "react";
import "../../../cssfolder/GalleryComponent.css";
import { useCreateConsultantCoverPhotoMutation } from "../../../_store/api";
import {
  useGetGalleryListQuery,
  useDeleteGalleryMutation,
} from "../../../_store/api";
import DeleteComponent from "../../payments/DeleteComponent";
import { Trash } from "lucide-react";
import { useSelector } from "react-redux";

const CoachProfilePhotos = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);

  const inputRef = useRef(null);
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const [addImage, { isLoading }] = useCreateConsultantCoverPhotoMutation();
  const { data: fetchData } = useGetGalleryListQuery(consultantId);
  const [deleteImage] = useDeleteGalleryMutation();

  useEffect(() => {
    if (fetchData) {
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
                    background: "#fff",
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
                  <div className="hover-buttons">
                    <button
                      className="hover-button"
                      onClick={() => toggleDeleteComponent(data)}
                    >
                      <Trash />
                    </button>
                  </div>
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
          />
        )}
      </div>
    </>
  );
};

export default CoachProfilePhotos;

import React, { useState, useEffect } from "react";

import { Settings } from "lucide-react";

import { useSelector } from "react-redux";

// import AstrologerSettings from "../AstrologerSettings";
import CoachSettings from "../CoachSettings";

import { ConsultantGalleryStatus } from "../../../../_constants/consultantConstant";

import { useGetGalleryListQuery } from "../../../../_store/api";

const CoachProfilePhoto = () => {
  const [openSetting, setOpenSetting] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageStatuses, setImageStatuses] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageUrls, setImageUrls] = useState([]);

  const consultantId = useSelector((state) => state.consultant.consultantData);

  const { data: fetchData } = useGetGalleryListQuery(consultantId);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.other) {
      setImageUrls(fetchData?.data?.profile_pic);
    }
  }, [fetchData]);

  console.log("imageUrls", imageUrls);

  useEffect(() => {
    if (imageUrls) {
      setImageStatuses(ConsultantGalleryStatus(imageUrls.status));
    }
  }, [imageUrls]);

  const toggleSettingModal = (url) => {
    setSelectedImage(url);
    setOpenSetting(!openSetting);
  };

  // const handleStatusChange = (url, status) => {
  //   setImageStatuses((prevStatuses) => ({
  //     ...prevStatuses,
  //     [url]: status,
  //   }));
  // };

  const handleImageLoad = (url) => {
    setLoadedImages((prevLoadedImages) => ({
      ...prevLoadedImages,
      [url]: true,
    }));
  };

  console.log("imageStatuses", imageStatuses);

  return (
    <>
      <div className="ProfileData-card">
        <h3 className="ProfileData-subheading">Profile Photos</h3>
        <div className="gallery-maincontainer">
          {imageUrls && imageUrls.url ? (
            <div className="gallery-grid">
              <div className="image-container">
                <img
                  src={imageUrls.url}
                  alt={`Product Image `}
                  onLoad={() => handleImageLoad(imageUrls.url)}
                />

                {loadedImages[imageUrls.url] && (
                  <>
                    <div className="topnav">
                      {imageStatuses && (
                        <a className={`topnav-${imageStatuses.toLowerCase()}`}>
                          {imageStatuses}
                        </a>
                      )}
                    </div>

                    <div className="galleryIcons">
                      <span onClick={() => toggleSettingModal(imageUrls)}>
                        <Settings />
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <p>No profile image available</p>
          )}
        </div>

        {openSetting && selectedImage && (
          <CoachSettings
            isOpen={openSetting}
            onClose={toggleSettingModal}
            imageUrl={selectedImage}
            currentStatus={selectedImage.status}
            // onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </>
  );
};
export default CoachProfilePhoto;

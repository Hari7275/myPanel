import React, { useState, useRef, useEffect } from "react";

import { Settings } from "lucide-react";

import { useGetUserVerificationListQuery } from "../../../../_store/api";

import UserVerificationSettings from "./UserVerificationSettings";

import { useSelector } from "react-redux";

const UserRequestPhoto = () => {
  const userId = useSelector((state) => state?.user?.userData);

  const { data: fetchData } = useGetUserVerificationListQuery(userId);

  const [openSetting, setOpenSetting] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageStatuses, setImageStatuses] = useState({});
  const [consultantId, setConsultantId] = useState([]);

  useEffect(() => {
    if (fetchData) {
      const urls = fetchData?.data?.records?.map((photo) => ({
        url: photo?.image,
        reject_note: photo?.reject_note,
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

  return (
    <>
      <div className="ProfileData-container ">
        <div className="ProfileData-card">
          <h3 className="ProfileData-subheading">Verification Request </h3>
          <div className="gallery-maincontainer">
            <div className="gallery-grid">
              {imageUrls?.map((photo, index) => (
                <div key={index} className="image-container">
                  <img src={photo?.url} alt={`Image ${index + 1}`} />

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
                    <span onClick={() => toggleSettingModal(photo)}>
                      <Settings />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {openSetting && selectedImage && (
          <UserVerificationSettings
            isOpen={openSetting}
            onClose={toggleSettingModal}
            imageData={selectedImage}
            currentStatus={imageStatuses[selectedImage]}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>
    </>
  );
};

export default UserRequestPhoto;

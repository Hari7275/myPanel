import React, { useState, useEffect } from "react";

import { Settings } from "lucide-react";

import { useSelector } from "react-redux";

import AstrologerSettings from "../AstrologerSettings";

import { ConsultantGalleryStatus } from "../../../../_constants/consultantConstant";

import { useGetGalleryListQuery } from "../../../../_store/api";
import usePermissions from "../../../../_components/reuseComponents/permission/EmpPermission";
import ImageCropper from "../../../listeners/gallery/ImageCropper";

const ProfilePhoto = () => {
  const [openSetting, setOpenSetting] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageStatuses, setImageStatuses] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const permissions = usePermissions();
  const consultantId = useSelector((state) => state.consultant.consultantData);
  const [openImageCropper, setOpenImageCropper] = useState(false);

  const { data: fetchData } = useGetGalleryListQuery(consultantId);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.other) {
      setImageUrls(fetchData?.data?.profile_pic);
    } else {
      setImageUrls([]);
    }
  }, [fetchData]);

  useEffect(() => {
    if (imageUrls) {
      setImageStatuses(ConsultantGalleryStatus(imageUrls?.status));
    }
  }, [imageUrls]);

  const toggleSettingModal = (url) => {
    setSelectedImage(url);
    setOpenSetting(!openSetting);
  };

    const toggleImageCropper = (url) => {
    setSelectedImage(url);
    setOpenImageCropper(!openImageCropper);
  };

  const handleImageLoad = (url) => {
    setLoadedImages((prevLoadedImages) => ({
      ...prevLoadedImages,
      [url]: true,
    }));
  };

  return (
    <>
      <div className="ProfileData-card">
        <h3 className="ProfileData-subheading">Profile Photos</h3>
        <div className="gallery-maincontainer">
          {imageUrls && imageUrls.url ? (
            <div className="gallery-grid">
              <div className="image-container">
                <img
                  src={imageUrls?.url}
                  alt={`Product Image `}
                  onLoad={() => handleImageLoad(imageUrls?.url)}
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
                    {permissions?.["astrologer"]?.includes(
                      "update_astrologer_profile_gallery"
                    ) && (
                      <div className="galleryIcons">
                        <span onClick={() => toggleSettingModal(imageUrls)}>
                          <Settings />
                        </span>
                        <span onClick={() => toggleImageCropper(imageUrls)}>
                          <img src="/cropAdmin.png" className="galleryIcon" />
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <p>No profile image available</p>
          )}
        </div>

        {openSetting && selectedImage && (
          <AstrologerSettings
            isOpen={openSetting}
            onClose={toggleSettingModal}
            imageUrl={selectedImage}
            currentStatus={selectedImage?.status}
            // onStatusChange={handleStatusChange}.
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
      </div>
    </>
  );
};
export default ProfilePhoto;

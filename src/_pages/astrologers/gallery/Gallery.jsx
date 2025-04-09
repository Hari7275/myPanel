import React, { useState } from "react";
import AstrologerProfilePhotos from "./AstrologerProfilePhoto";

import AstrologerGallery from "./AstrologerGallery";
import ProfilePhoto from "./consultantPropfilePhoto/ProfilePhoto";

const Gallery = () => {
  const [activeComponent, setActiveComponent] = useState("AstrologerGallery");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <>
        <div className="profile-sub-container ProfileData-container sub-container">
          <header
            className="profile-mainContainer "
            style={{ margin: "-20px 0px 20px -35px" }}
          >
            <div
              className={`profile-link ${
                activeComponent === "AstrologerProfilePhotos" ? "subactive" : ""
              }`}
              onClick={() => handleComponentChange("AstrologerProfilePhotos")}
            >
              {/* use this component */}

              <span>Cover photo </span>
            </div>

            <div
              className={`profile-link ${
                activeComponent === "AstrologerGallery" ? "subactive" : ""
              }`}
              onClick={() => handleComponentChange("AstrologerGallery")}
            >
              <span>Other Photo</span>
            </div>
            <div
              className={`profile-link ${
                activeComponent === "profilePhoto" ? "subactive" : ""
              }`}
              onClick={() => handleComponentChange("profilePhoto")}
            >
              <span>profile Photo</span>
            </div>
          </header>

          <div>
            {activeComponent === "AstrologerProfilePhotos" && (
              <AstrologerProfilePhotos />
            )}

            {activeComponent === "AstrologerGallery" && <AstrologerGallery />}
            {activeComponent === "profilePhoto" && <ProfilePhoto />}
          </div>
        </div>
      </>
    </>
  );
};

export default Gallery;

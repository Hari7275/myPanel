import React, { useState } from "react";
import CoachProfilePhotos from "./CoachProfilePhotos";
import CoachGallery from "./CoachGallery";
import CoachProfilePhoto from "./consultantPropfilePhoto/CoachProfilePhoto";

const Gallery = () => {
  const [activeComponent, setActiveComponent] = useState("CoachGallery");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <>
        <div className="profile-sub-container ProfileData-container profile-right-sub-container">
          <header
            className="profile-mainContainer "
            style={{ margin: "-20px 0px 20px -35px" }}
          >
            <div
              className={`profile-link ${activeComponent === "CoachProfilePhotos" ? "subactive" : ""
                }`}
              onClick={() => handleComponentChange("CoachProfilePhotos")}
            >
              <span>Cover photo</span>
            </div>

            <div
              className={`profile-link ${activeComponent === "CoachGallery" ? "subactive" : ""
                }`}
              onClick={() => handleComponentChange("CoachGallery")}
            >
              <span>Other Photo</span>
            </div>
            <div
              className={`profile-link ${activeComponent === "CoachProfilePhoto" ? "subactive" : ""
                }`}
              onClick={() => handleComponentChange("CoachProfilePhoto")}
            >
              <span>Profile Photo</span>
            </div>
          </header>

          <div>
            {activeComponent === "CoachProfilePhotos" && <CoachProfilePhotos />}
            {activeComponent === "CoachGallery" && <CoachGallery />}
            {activeComponent === "CoachProfilePhoto" && <CoachProfilePhoto />}
          </div>
        </div>
      </>
    </>
  );
};

export default Gallery;

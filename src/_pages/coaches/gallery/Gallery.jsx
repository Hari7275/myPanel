import React, { useState } from "react";
import CoachProfilePhotos from "./CoachProfilePhotos";
import CoachGallery from "./CoachGallery";

const Gallery = () => {
  const [activeComponent, setActiveComponent] = useState("CoachGallery");

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
                activeComponent === "CoachProfilePhotos" ? "subactive" : ""
              }`}
              onClick={() => handleComponentChange("CoachProfilePhotos")}
            >
              <span>Cover photo</span>
            </div>

            <div
              className={`profile-link ${
                activeComponent === "CoachGallery" ? "subactive" : ""
              }`}
              onClick={() => handleComponentChange("CoachGallery")}
            >
              <span>Other Photo</span>
            </div>
          </header>

          <div>
            {activeComponent === "CoachProfilePhotos" && <CoachProfilePhotos />}
            {activeComponent === "CoachGallery" && <CoachGallery />}
          </div>
        </div>
      </>
    </>
  );
};

export default Gallery;

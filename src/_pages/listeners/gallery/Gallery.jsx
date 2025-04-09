import React, { useState } from "react";
import ListenerProfilePhotos from "./ListenerProfilePhotos";
import ListenerGallery from "./ListenerGallery";
import CoachProfilePhoto from "../../coaches/gallery/consultantPropfilePhoto/CoachProfilePhoto";

const Gallery = () => {
  const [activeComponent, setActiveComponent] = useState("ListenerGallery");
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
                activeComponent === "ListenerProfilePhotos" ? "subactive" : ""
              }`}
              onClick={() => handleComponentChange("ListenerProfilePhotos")}
            >
              <span>Cover photo</span>
            </div>

            <div
              className={`profile-link ${
                activeComponent === "ListenerGallery" ? "subactive" : ""
              }`}
              onClick={() => handleComponentChange("ListenerGallery")}
            >
              <span>Other Photo</span>
            </div>

            <div
              className={`profile-link ${
                activeComponent === "CoachProfilePhoto" ? "subactive" : ""
              }`}
              onClick={() => handleComponentChange("CoachProfilePhoto")}
            >
              <span>profile Photo</span>
            </div>
          </header>

          <div>
            {activeComponent === "ListenerProfilePhotos" && (
              <ListenerProfilePhotos />
            )}
            {activeComponent === "ListenerGallery" && <ListenerGallery />}
            {activeComponent === "CoachProfilePhoto" && <CoachProfilePhoto />}
          </div>
        </div>
      </>
    </>
  );
};

export default Gallery;

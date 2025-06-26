import React, { useState } from "react";
import UserRequestPhoto from "./userVerificationPhoto/UserRequestPhoto";

import UserGallery from "./UserGalllery";
import UserProfilePhoto from "./profilePhoto/ProfilePhoto";

const Gallery = () => {
  const [activeComponent, setActiveComponent] = useState("UserGallery");

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
              className={`profile-link ${activeComponent === "UserGallery" ? "subactive" : ""
                }`}
              onClick={() => handleComponentChange("UserGallery")}
            >
              {/* use this component */}

              <span>User Gallery </span>
            </div>

            <div
              className={`profile-link ${activeComponent === "UserRequestPhoto" ? "subactive" : ""
                }`}
              onClick={() => handleComponentChange("UserRequestPhoto")}
            >
              <span>Verification Photo</span>
            </div>

            <div
              className={`profile-link ${activeComponent === "ProfilePhoto" ? "subactive" : ""
                }`}
              onClick={() => handleComponentChange("ProfilePhoto")}
            >
              <span>profile Photo</span>
            </div>
          </header>

          <div>
            {activeComponent === "UserRequestPhoto" && <UserRequestPhoto />}

            {activeComponent === "UserGallery" && <UserGallery />}
            {activeComponent === "ProfilePhoto" && <UserProfilePhoto />}
          </div>
        </div>
      </>
    </>
  );
};

export default Gallery;

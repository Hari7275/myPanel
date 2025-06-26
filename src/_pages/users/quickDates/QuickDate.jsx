import React, { useState } from 'react'
import QuickDateEvents from "./QuickDateEvents"
import MeetupTrips from './trips/MeetupTrips'

const QuickDate = () => {
  const [activeComponent, setActiveComponent] = useState("MeetupTrips");
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
              className={`profile-link ${activeComponent === "MeetupTrips" ? "subactive" : ""
                }`}
              onClick={() => handleComponentChange("MeetupTrips")}
            >
              <span>Meetup Trips</span>
            </div>
            <div
              className={`profile-link ${activeComponent === "QuickDateEvents" ? "subactive" : ""
                }`}
              onClick={() => handleComponentChange("QuickDateEvents")}
            >
              <span>Quick Date Events</span>
            </div>
          </header>

          <div>
            {activeComponent === "QuickDateEvents" && <QuickDateEvents />}
            {activeComponent === "MeetupTrips" && <MeetupTrips />}
          </div>
        </div>
      </>
    </>
  );
};

export default QuickDate;